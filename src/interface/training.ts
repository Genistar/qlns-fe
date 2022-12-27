export interface training {
    id: number,
    fkMaBac: string,
    fkMaHeDaoTao: string,
    fkMaCanBo: string,
    nganhDaoTao: string,
    noiDaoTao: string,
    quocGia: string,
    tenLuanAn: string,
    thoiGianBD: Date,
    thoiGianKT: Date,
    Bac_dao_tao?: {
        id: string,
        tenBac: string,
        thoiGianToiDa: number,
        giaHan: number
    },
    DM_he_dao_tao?: {
        id: string,
        tenHeDaoTao: string,
        hienThi: number
    }
}