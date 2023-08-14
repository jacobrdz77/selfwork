import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const UserAuthForm = () => {
  const router = useRouter();

  return (
    <>
      <div className="user-auth-container">
        <div className="user-auth-form">
          <h1 className="title">Sign in</h1>
          <p className="sub-title">Use one of the providers to sign in</p>
          {/* <form onSubmit={onSubmit}>
            <div className="email-signin">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-email"
                placeholder="name@gmail.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />

              <button
                className={`button button--email ${isLoading ? "loading" : ""}`}
              >
                Sign In with Email
              </button>
            </div>
          </form>
          <div className="continue-with">
            <div className="line"></div>
            <div className="gray-text">OR CONTINUE WITH</div>
            <div className="line"></div>
          </div> */}
          <div>
            <button
              className="button button--google"
              type="button"
              onClick={async () => {
                signIn("google", {
                  callbackUrl: "/my-tasks/board",
                });
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8669 15.3911C16.5518 13.8186 17.3006 11.1977 16.8513 8.68912H10.1493V11.4598H13.9683C13.8186 12.3584 13.2943 13.1072 12.5455 13.594L14.8669 15.3911Z"
                  fill="#4285F4"
                />
                <path
                  d="M3.78424 13.1821C3.84559 13.3029 3.91028 13.4218 3.9783 13.539C4.04638 13.6562 4.11768 13.7713 4.19221 13.8844C4.26679 13.9975 4.34445 14.1084 4.42528 14.2171C4.50612 14.3258 4.58992 14.4321 4.67679 14.5361C4.76362 14.6401 4.8533 14.7416 4.94591 14.8405C5.03846 14.9394 5.13377 15.0356 5.23179 15.1291C5.32981 15.2226 5.43039 15.3133 5.53351 15.4011C5.63664 15.489 5.74216 15.5738 5.85013 15.6557C5.95804 15.7376 6.0682 15.8163 6.18059 15.8919C6.29299 15.9676 6.40742 16.04 6.52393 16.1091C6.64039 16.1783 6.75872 16.2441 6.87893 16.3066C6.99914 16.3691 7.12101 16.4281 7.24455 16.4837C7.36809 16.5393 7.49309 16.5914 7.61961 16.6398C7.74606 16.6884 7.87382 16.7333 8.00283 16.7746C8.13184 16.8159 8.26195 16.8535 8.39309 16.8875C8.52424 16.9214 8.65622 16.9516 8.78908 16.9781C8.92195 17.0046 9.05544 17.0273 9.18961 17.0463C9.32372 17.0652 9.4583 17.0803 9.5933 17.0916C9.7283 17.1029 9.86351 17.1105 9.99893 17.1141C10.1343 17.1178 10.2698 17.1177 10.4052 17.1137C10.5406 17.1097 10.6758 17.1019 10.8108 17.0903C10.9457 17.0787 11.0802 17.0633 11.2143 17.0441C11.3485 17.0248 11.4819 17.0018 11.6147 16.9751C11.7475 16.9483 11.8794 16.9178 12.0105 16.8836C12.1416 16.8494 12.2716 16.8115 12.4005 16.7699C12.5294 16.7283 12.6571 16.6831 12.7835 16.6343C12.9099 16.5855 13.0348 16.5332 13.1582 16.4773C13.2816 16.4215 13.4034 16.3622 13.5234 16.2995C13.6435 16.2368 13.7617 16.1707 13.878 16.1013C13.9943 16.0318 14.1086 15.9592 14.2209 15.8833C14.3331 15.8075 14.4431 15.7284 14.5509 15.6464C14.6586 15.5643 14.764 15.4792 14.8669 15.3911L12.5455 13.594C10.5612 14.9044 7.26632 14.4177 6.14304 11.3475L3.78424 13.1821Z"
                  fill="#34A853"
                />
                <path
                  d="M6.14309 11.3475C5.84356 10.4114 5.84356 9.55026 6.14309 8.61422L3.78428 6.77959C2.92314 8.50193 2.66106 10.9356 3.78428 13.1821L6.14309 11.3475Z"
                  fill="#FBBC02"
                />
                <path
                  d="M6.14304 8.61422C6.96679 6.03078 10.4863 4.53312 12.8451 6.74213L14.9043 4.72031C11.9839 1.91224 6.29283 2.02453 3.78424 6.77958L6.14304 8.61422Z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
          <div>
            <button
              className="button button--demo"
              type="button"
              onClick={() => {
                router.push("/my-tasks/board");
              }}
            >
              Demo project
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuthForm;
