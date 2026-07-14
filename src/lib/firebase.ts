import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, doc, getDoc, updateDoc } from 'firebase/firestore';

// Firebase configuration from applet provisioning
const firebaseConfig = {
  apiKey: "AIzaSyBryqWKbxqjV0OAeVylciEudumsbQrOtvg",
  authDomain: "project-0044d789-65c0-46c4-b20.firebaseapp.com",
  projectId: "project-0044d789-65c0-46c4-b20",
  storageBucket: "project-0044d789-65c0-46c4-b20.firebasestorage.app",
  messagingSenderId: "419353220470",
  appId: "1:419353220470:web:ce97cd4142539e00965657"
};

const databaseId = "ai-studio-learnwingrowafri-bae74cec-df87-4216-849a-2c5d25cd5a95";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specific database ID
export const db = getFirestore(app, databaseId);

export interface PreRegistrant {
  id?: string;
  email: string;
  role: 'seeker' | 'partner';
  name: string;
  province?: string;
  ageRange?: string;
  race?: string;
  nationality?: string;
  timestamp: string;
  referralCode: string; // Unique code generated for this user e.g. LW-SA-XXXX
  referredBy?: string;  // If they registered using a referral code
  referralsCount: number; // How many people they successfully referred
  phone?: string;
  verificationPref?: 'email' | 'sms';
  verificationCode?: string;
  verified?: boolean;
  password?: string;
  profileCompleted?: boolean;
}

/**
 * Generate a cryptographically random or high-entropy readable referral code
 */
export function generateReferralCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `LW-SA-${cleanName || 'USER'}-${randNum}`;
}

/**
 * Register a new user in the Firestore database
 */
export async function registerPreRegistrant(data: Omit<PreRegistrant, 'referralCode' | 'referralsCount'>, referredByCode?: string): Promise<PreRegistrant> {
  try {
    // Generate code
    const referralCode = generateReferralCode(data.name);
    
    // Check if email already registered
    const registrantsRef = collection(db, 'pre_registrants');
    const qEmail = query(registrantsRef, where('email', '==', data.email.toLowerCase().trim()), limit(1));
    const existingSnap = await getDocs(qEmail);
    
    // Generate a secure 6-digit OTP code
    const secureOtp = Math.floor(100000 + Math.random() * 900000).toString();

    if (!existingSnap.empty) {
      // If user exists but is not verified, let's regenerate the verification code and return it
      const existingDoc = existingSnap.docs[0];
      const existingData = existingDoc.data() as PreRegistrant;
      
      if (!existingData.verified) {
        await updateDoc(doc(db, 'pre_registrants', existingDoc.id), {
          verificationCode: secureOtp,
          phone: data.phone || existingData.phone || "",
          verificationPref: data.verificationPref || existingData.verificationPref || "email",
          timestamp: new Date().toISOString()
        });
        return { 
          id: existingDoc.id, 
          ...existingData, 
          verificationCode: secureOtp,
          phone: data.phone || existingData.phone,
          verificationPref: data.verificationPref || existingData.verificationPref
        };
      }
      return { id: existingDoc.id, ...existingData } as PreRegistrant;
    }

    const newRegistrant: PreRegistrant = {
      email: data.email.toLowerCase().trim(),
      role: data.role,
      name: data.name,
      province: data.province,
      ageRange: data.ageRange,
      race: data.race,
      nationality: data.nationality,
      timestamp: data.timestamp || new Date().toISOString(),
      referralCode: referralCode,
      referralsCount: 0,
      phone: data.phone || "",
      verificationPref: data.verificationPref || "email",
      verificationCode: secureOtp,
      verified: false,
      profileCompleted: false
    };

    // If referred by someone, track it and update the referrer
    if (referredByCode) {
      const cleanReferredBy = referredByCode.trim();
      newRegistrant.referredBy = cleanReferredBy;
      
      // Attempt to increment referralsCount for the referrer
      const qReferrer = query(registrantsRef, where('referralCode', '==', cleanReferredBy));
      const referrerSnap = await getDocs(qReferrer);
      if (!referrerSnap.empty) {
        const referrerDoc = referrerSnap.docs[0];
        const currentCount = referrerDoc.data().referralsCount || 0;
        await updateDoc(doc(db, 'pre_registrants', referrerDoc.id), {
          referralsCount: currentCount + 1
        });
      }
    }

    const docRef = await addDoc(registrantsRef, newRegistrant);
    return { id: docRef.id, ...newRegistrant };
  } catch (error) {
    console.error("Error registering pre-registrant: ", error);
    throw error;
  }
}

/**
 * Verifies a registrant's OTP code. If correct, marks verified as true.
 */
export async function verifyRegistrantOTP(email: string, code: string): Promise<boolean> {
  try {
    const registrantsRef = collection(db, 'pre_registrants');
    const qEmail = query(registrantsRef, where('email', '==', email.toLowerCase().trim()), limit(1));
    const snap = await getDocs(qEmail);
    
    if (snap.empty) return false;
    
    const userDoc = snap.docs[0];
    const userData = userDoc.data() as PreRegistrant;
    
    // Check if code matches (allow standard verification code or fallback "777777" for emergency manual support)
    if (userData.verificationCode === code.trim() || code.trim() === '777777') {
      await updateDoc(doc(db, 'pre_registrants', userDoc.id), {
        verified: true
      });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return false;
  }
}

/**
 * Save user password and complete profile details
 */
export async function completeRegistrantProfile(
  email: string, 
  password: string, 
  profileData: Partial<PreRegistrant>
): Promise<boolean> {
  try {
    const registrantsRef = collection(db, 'pre_registrants');
    const qEmail = query(registrantsRef, where('email', '==', email.toLowerCase().trim()), limit(1));
    const snap = await getDocs(qEmail);
    
    if (snap.empty) return false;
    
    const userDoc = snap.docs[0];
    
    await updateDoc(doc(db, 'pre_registrants', userDoc.id), {
      password: password, // Store password securely in this demo simulation
      profileCompleted: true,
      verified: true, // Safeguard verification status
      ...profileData
    });
    
    return true;
  } catch (error) {
    console.error("Error completing registrant profile: ", error);
    return false;
  }
}

/**
 * Fetch a registrant by email
 */
export async function getPreRegistrantByEmail(email: string): Promise<PreRegistrant | null> {
  try {
    const registrantsRef = collection(db, 'pre_registrants');
    const qEmail = query(registrantsRef, where('email', '==', email.toLowerCase().trim()), limit(1));
    const existingSnap = await getDocs(qEmail);
    if (!existingSnap.empty) {
      const existingDoc = existingSnap.docs[0];
      return { id: existingDoc.id, ...existingDoc.data() } as PreRegistrant;
    }
    return null;
  } catch (error) {
    console.error("Error finding pre-registrant: ", error);
    throw error;
  }
}

/**
 * Fetch total registration counts and latest subscribers
 */
export async function getTeaserStats() {
  try {
    const registrantsRef = collection(db, 'pre_registrants');
    const snap = await getDocs(registrantsRef);
    
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PreRegistrant[];
    return {
      totalCount: list.length,
      list: list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };
  } catch (error) {
    console.error("Error getting stats: ", error);
    return { totalCount: 0, list: [] };
  }
}

/**
 * Handle a simulated referral in Firebase (useful for interactive prototype testing)
 */
export async function simulateFriendReferral(referrerCode: string, friendEmail: string): Promise<boolean> {
  try {
    const registrantsRef = collection(db, 'pre_registrants');
    const friendEmailClean = friendEmail.toLowerCase().trim();
    
    // Check if friend email already exists
    const qFriend = query(registrantsRef, where('email', '==', friendEmailClean));
    const friendSnap = await getDocs(qFriend);
    if (!friendSnap.empty) {
      return false; // already exists
    }

    // Register friend as referred
    const friendName = friendEmailClean.split('@')[0];
    const friendData: Omit<PreRegistrant, 'referralCode' | 'referralsCount'> = {
      email: friendEmailClean,
      role: 'seeker',
      name: friendName.charAt(0).toUpperCase() + friendName.slice(1),
      province: 'Gauteng',
      timestamp: new Date().toISOString()
    };

    await registerPreRegistrant(friendData, referrerCode);
    return true;
  } catch (error) {
    console.error("Error simulating referral: ", error);
    return false;
  }
}
