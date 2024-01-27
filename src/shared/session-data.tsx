import type { Session } from "next-auth";

export default function SessionData({ session }: { session: Session | null }) {
  return session ? (
    <div className="w-full space-y-2 overflow-auto">
      <h2 className="text-xl font-bold">Current Session Data</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  ) : (
    <>
      <p>
        No session data, please <em>Sign In</em> first.
      </p>
    </>
  );
}
