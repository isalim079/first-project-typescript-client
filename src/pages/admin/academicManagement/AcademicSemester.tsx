import { academicManagementApi } from "../../../redux/features/admin/academicManagement.api";



const AcademicSemester = () => {

    const {data} = academicManagementApi.useGetAllSemestersQuery(undefined)

    console.log(data);

    return (
        <div>
            AcademicSemester Component
        </div>
    );
};

export default AcademicSemester;