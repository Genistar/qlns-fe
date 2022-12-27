export interface nation {
    id: string,
    ten_dan_toc: string,
    ghichu: string
}
export interface religion {
    id: number,
    ten_ton_giao: string,
    ghichu: string
}
export interface typeOfTraining {
    id: string,
    tenHeDaoTao: string,
    hienThi: number
}
export interface cultivationForm {
    id: string,
    tenHinhThuc: string,
    tuVietTat: string
}
export interface rewardD {
    id: string,
    tenKhenThuong: string,
    tenVietTat: string
}
export interface disciplineD {
    id: string,
    tenKyLuat: string,
    tenVietTat: string
}
export interface academicRank {
    id: string,
    ten: string
}
export interface degreeD {
    id: string,
    ten: string
}
export interface majors {
    id: number,
    ten_nganh: string
}
export interface subject {
    id: number,
    bomonId: number,
    ten_bo_mon: string,
    ma_khoa: string,
    ma_bo_mon_truong: string,
    xoa: number,
    cap_khoa: string
}
export interface trainingLevel {
    id: string,
    tenBac: string,
    thoiGianToiDa: number,
    giaHan: number
}
export interface contractType {
    id: String,
    tenLoaiHopDong: String,
    kyTuVietTat: String,
    soThang: String
}
export interface civilServantRank {
    id: String,
    maSoNgach: String,
    nhom: String,
    tenNgach: String,
    soNamNangBac: number,
    tuVietTat: String,
    thuTuUuTien: number
}
export interface salaryScale {
    id: number,
    heSoLuong: number,
    ngayBatDauHieuLuc: Date,
    ngayHetHieuLuc: Date,
    fkIdNgach: String,
    fkIdNhom: String
}
export interface position {
    id: string,
    ten_chuc_vu: string
}
