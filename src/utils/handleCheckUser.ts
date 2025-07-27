type LocalType = {
  localToken: string | null;
  localEmail: string | null;
  isLogin: boolean;
};
export function handleCheckUser(): LocalType {
  const userLocalData = localStorage.getItem("auth-storage");
  if (!userLocalData)
    return {
      localToken: null,
      localEmail: null,
      isLogin: false,
    };
  const parsedData = JSON.parse(userLocalData);
  const isLogin = parsedData?.state?.isLoggedIn;
  const localToken = parsedData?.state?.token || null;
  const localEmail = parsedData?.state?.user?.email || null;
  return { localToken, localEmail, isLogin };
}
