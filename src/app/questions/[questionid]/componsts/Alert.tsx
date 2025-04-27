import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";

interface AlertType {
  type: string;
  action: boolean;
  text: string;
}
interface AlertProps {
  showAlert: AlertType;
  setShowAlert: (value: AlertType) => void;
}
export default function Alert({ showAlert, setShowAlert }: AlertProps) {
  const router = useRouter();
  const handleMoveToLogin = () => {
    if (showAlert.type === "login") {
      router.push("/login");
    }
  };
  const isLogin = showAlert.type === "login";
  return (
    <AlertDialog
      open={showAlert.action}
      onOpenChange={(open) => setShowAlert({ ...showAlert, action: open })}
    >
      <AlertDialogContent>
        <AlertDialogHeader className="mx-auto mb-4">
          <AlertDialogTitle>{showAlert.text}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto flex">
          <AlertDialogAction onClick={handleMoveToLogin} className="w-[100px]">
            {isLogin ? "이동하기" : "확인"}
          </AlertDialogAction>
          <AlertDialogCancel className="w-[100px]">닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
