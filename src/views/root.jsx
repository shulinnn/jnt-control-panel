import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-row gap-x-8">
            <Link
              to="players"
              className="max-w-sm rounded overflow-hidden shadow-lg bg-secondary px-4 py-8"
            >
              PLAYERS
            </Link>
            <Link
              to="matches"
              className="max-w-sm rounded overflow-hidden shadow-lg bg-secondary px-4 py-8"
            >
              MATCHES
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
