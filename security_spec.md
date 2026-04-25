# Security Specification - Phonétique App

## Data Invariants
1. A user can only read and write their own profile (`/users/{uid}`).
2. A user can only read and write their own lesson progress (`/users/{uid}/progress/{lessonId}`).
3. Admins (if any) can read all data.

## The Dirty Dozen Payloads (Rejection Tests)
1. Write to another user's profile.
2. Read another user's progress.
3. Update `currentLessonId` to a lesson skip (e.g. from 1 to 50 directly) - *Actually, we'll allow updates to currentLessonId but logic in app handles sequence.* 
4. Injecting extremely large strings in `displayName`.
5. Setting `totalXp` to a negative value.
6. Deleting the `users` collection.
7. Spoofing `userId` in `LessonProgress`.
8. Updating `lastActiveAt` to a future date.
9. Writing progress for a lesson ID < 1 or > 120.
10. Anonymous users writing to public collections.
11. Bypassing `email_verified` (if applicable).
12. Shadow updates with fields like `isAdmin`.

## Test Runner (Mock)
(Simplified for implementation)
`test('unauthorized write', () => assertFails(setDoc(otherUserProfile)))`
