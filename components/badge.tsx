
interface BadgeProps {
    children : React.ReactNode
}

export const Badge = ({
    children
} : BadgeProps) => {
    return (
        <span className="border rounded px-2 py-0.5 bg-muted text-sm font-medium">
            {children}
        </span>
    )
}
