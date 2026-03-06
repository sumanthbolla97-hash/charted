import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, type Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';

export interface BookingRecord {
  id: string;
  userId: string;
  source: 'live_quote' | 'empty_leg';
  aircraft: string;
  route: string;
  date: string;
  amountUsd: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

type CreateBookingInput = Omit<BookingRecord, 'id' | 'createdAt'>;

export async function createBooking(input: CreateBookingInput) {
  if (!db) throw new Error('Firestore is not configured.');
  await addDoc(collection(db, 'bookings'), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export function subscribeUserBookings(userId: string, onData: (records: BookingRecord[]) => void): Unsubscribe {
  if (!db) return () => {};
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const records: BookingRecord[] = snap.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<BookingRecord, 'id'>) }))
      .filter((r) => r.userId === userId);
    onData(records);
  });
}
