export interface reward {
    id?: number,
    namKhenThuong: string,
    fkMaKhenThuong: string,
    hinhThucKhenThuongKhac: string,
    coQuan: string,
    coQuanKhac: string,
    ghiChu: string,
    fkMaCanBo: string,
    soCongVan: number,
    DM_khen_thuong?: {
        id: string,
        tenKhenThuong: string,
        tenVietTat: string,
    }
}