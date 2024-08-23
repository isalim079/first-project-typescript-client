import { Table, TableColumnsType, TableProps } from "antd";
import { academicManagementApi } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";

export type TTableData = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

    const { data: semesterData, isFetching } =
        academicManagementApi.useGetAllSemestersQuery(params);
    // console.log(semesterData);

    const tableData = semesterData?.data?.map(
        ({ _id, name, startMonth, endMonth, year }) => ({
            key: _id,
            name,
            startMonth,
            endMonth,
            year,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Fall",
                    value: "Fall",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
            ],
        },
        {
            title: "Year",
            key: "year",
            dataIndex: "year",
            filters: [
                {
                    text: "2024",
                    value: "2024",
                },
                {
                    text: "2025",
                    value: "2025",
                },
                {
                    text: "2026",
                    value: "2026",
                },
            ],
        },
        {
            title: "Start Month",
            key: "startMonth",
            dataIndex: "startMonth",
        },
        {
            title: "End Month",
            key: "endMonth",
            dataIndex: "endMonth",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            filters.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item })
            );

            setParams(queryParams);
        }
    };

    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
            />
        </div>
    );
};

export default AcademicSemester;
