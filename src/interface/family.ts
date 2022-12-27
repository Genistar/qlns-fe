export interface family {
    id: number,
    hovaten: string,
    namSinh: string,
    queQuan: string,
    ngheNghiep: string,
    donViCongTacHocTap: string,
    noiO: string,
    fkMaQuanHe: string,
    fkMaCanBo: string,
    Can_bo_giang_day?: {
        cbId: string,
        ho: string,
        ten: string
    },
    Quan_he?: {
        id: string,
        tenQuanHe: string
    }
}