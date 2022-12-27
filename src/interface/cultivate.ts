

export interface cultivate {
    id: number,
    noiBoiDuong: string,
    boiDuongTuNgay: Date,
    boiDuongDenNgay: Date,
    noiDungBoiDuong: string,
    fkMaHinhThucBD: string,
    chungChiBoiDuong: null,
    fkMaCanBo: string,
    ghiChu: string,
    DM_Hinh_Thuc_BD?: {
        id: string,
        tenHinhThuc: string,
        tuVietTat: string,
    }
}