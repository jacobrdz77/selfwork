export { };
// import {
//   createClientComponentClient,
//   createPagesServerClient,
// } from "@supabase/auth-helpers-nextjs";
// import { createClient } from "@supabase/supabase-js";
// import { NextApiRequest, NextApiResponse } from "next";
// import { useUserStore, userStore } from "store/user";

// // const getURL = () => {
// //   let url =
// //     process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
// //     process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
// //     "http://localhost:3000/";
// //   // Make sure to include `https://` when not localhost.
// //   url = url.includes("http") ? url : `https://${url}`;
// //   // Make sure to include a trailing `/`.
// //   url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
// //   return url;
// // };

// // const { data, error } = await supabase.signInWithOAuth({
// //   provider: "github",
// //   options: {
// //     redirectTo: getURL(),
// //   },
// // });
// export const userGoogleSignIn = async () => {
//   const supabase = createClientComponentClient();
//   return await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: "http://localhost:3000/my-tasks/board",
//     },
//   });
// };

// export const userOTPSignIn = async (email: string) => {
//   const supabase = createClientComponentClient();
//   return await supabase.auth.signInWithOtp({
//     email,
//     options: {
//       emailRedirectTo: "http://localhost:3000/my-tasks/board",
//     },
//   });
// };

// export const userSignout = async () => {
//   const supabase = createClientComponentClient();
//   return await supabase.auth.signOut();
// };

// export const getSession = async () => {
//   const supabase = createClientComponentClient();
//   const { data, error } = await supabase.auth.getSession();
// };

// export const getUser = async () => {
//   const supabase = createClientComponentClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
// };

// export const checkUserSession = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   // Create authenticated Supabase Client
//   const supabase = createPagesServerClient({ req, res });
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session)
//     return res.status(401).json({
//       error: "not_authenticated",
//       description: "User is not authenticated",
//     });
// };
