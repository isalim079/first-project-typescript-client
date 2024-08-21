import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.route";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
};

const Sidebar = () => {
    const user = useAppSelector(selectCurrentUser);

    let sidebarItems;

    switch (user!.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(
                facultyPaths,
                userRole.FACULTY
            );
            break;
        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(
                studentPaths,
                userRole.STUDENT
            );
            break;
        default:
            break;
    }

    return (
        <Sider breakpoint="lg" collapsedWidth="0" style={{height: '100vh', position: 'sticky', top: '0', left: '0'}}>
            <div
                className="demo-logo-vertical"
                style={{
                    color: "white",
                    height: "3rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1>PH Uni</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sidebarItems}
            />
        </Sider>
    );
};

export default Sidebar;
