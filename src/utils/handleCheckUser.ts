type LocalType = {
  localToken: string | null;
  localEmail: string | null;
};
export function handleCheckUser(): LocalType {
  const userLocalData = localStorage.getItem("auth-storage");
  if (!userLocalData)
    return {
      localToken: null,
      localEmail: null,
    };
  const parsedData = JSON.parse(userLocalData);
  const localToken = parsedData?.state?.token || null;
  const localEmail = parsedData?.state?.user?.email || null;
  return { localToken, localEmail };
}
