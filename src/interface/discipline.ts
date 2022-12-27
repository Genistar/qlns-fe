export interface discipline {
    id: number,
    namBiKyLuat: string,
    namXoaHieuLucKyLuat: string,
    fkMaKyLuat: string,
    coQuan: string,
    coQuanKhac: string,
    ghiChu: string,
    fkMaCanBo: string,
    soThangBiKyLuat: string,
    soCongVan: string,
    DM_ky_luat?: {
        id: string,
        tenKyLuat: string,
        tenVietTat: string
    }
}