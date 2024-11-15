import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean,
}

export default function LoadingButton ({
    children,
    loading,
    ...props
} : LoadingButtonProps) {
    return (
        <Button {...props} disabled={props.disabled || loading}>
            <span className="flex items-center justify-center gap-1">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {children}
            </span>
        </Button>
    ) 
}