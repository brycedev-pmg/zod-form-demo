import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarMenu className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <Link href="/">Introduction</Link>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Forms</SidebarGroupLabel>
          <SidebarMenuSub>
            <Link href="/no-zod">
              <SidebarMenuSubItem>Plain Typescript</SidebarMenuSubItem>
            </Link>
            <Link href="/with-zod">
              <SidebarMenuSubItem>With Zod</SidebarMenuSubItem>
            </Link>
          </SidebarMenuSub>
        </SidebarGroup>
      </SidebarMenu>
      <SidebarFooter />
    </Sidebar>
  );
}
