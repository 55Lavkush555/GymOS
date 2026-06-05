import UserSync from "@/components/auth/UserSync";

export default function DashboardLayout({ children }) {
    return (
        <>
            <UserSync />
            {children}
        </>
    )
}