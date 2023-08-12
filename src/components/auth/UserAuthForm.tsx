import { useState } from "react";

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
  }

  return (
    <div className="user-auth-form">
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@gmail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <button disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Sign In with Email
          </button>
        </div>
      </form>
      <div>or continue with</div>

      <button type="button" disabled={isLoading}>
        {/* {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "} */}
        Google
      </button>
    </div>
  );
};

export default UserAuthForm;
