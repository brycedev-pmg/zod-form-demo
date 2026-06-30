"use server";

const USED_EMAILS = ["bryce@example.com", "test123@test.com"];

export async function checkEmail(email: string) {
  return await new Promise<boolean>(async (resolve) => {
    setTimeout(() => {
      resolve(USED_EMAILS.includes(email));
    }, 2000);
  });
}
