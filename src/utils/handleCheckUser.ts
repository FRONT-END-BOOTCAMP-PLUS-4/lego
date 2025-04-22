export function handleCheckUser() {
  const userLocalData = localStorage.getItem("auth-storage");
  if (!userLocalData) return null;

  try {
    const parsedData = JSON.parse(userLocalData);
    console.log(parsedData);
    const userToken = parsedData?.state?.token || null;
    return userToken;
  } catch (error) {
    console.error("로그인 한 유저 아님", error);
    return null;
  }
}
