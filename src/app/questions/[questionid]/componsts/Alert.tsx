import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  type: string;
  text: string;
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
}
export default function Alert({ type, text, showAlert, setShowAlert }: AlertProps) {
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader className="mx-auto mb-4">
          <AlertDialogTitle>{text}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel>확인</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
