import { Button } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { can_bo_giang_day } from '../../interface'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'
import './CV.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getAll as getTrainingUsers, trainingUserSelector } from '../../features/Home/User/TrainingUser/trainingUserSlice'
import { cultivateUserSelector, getAll as getCultivateUsers } from '../../features/Home/User/CultivateUser/cultivateUserSlice'
import { familySelector, getAll } from '../../features/Home/User/FamilyUser/familyUserSlice'
import { family } from '../../interface/family'
import { llctOption, qlnnOption, tdptOption, tdthOption } from '../../constant/selectOption'
import { foreignUserSelector, getAll as getForeigns } from '../../features/Home/User/BusinessUser/ForeignUser/foreignUserSlice'
import { foreign } from '../../interface/foreign'
import { domesticUserSelector, getAll as getDomestic } from '../../features/Home/User/BusinessUser/DomesticUser/domesticUserSlice'
import { business } from '../../interface/business'

type Props = {
    user: can_bo_giang_day | null,
    printPDF: any
}

const CV = (props: Props) => {
    let { user } = props;
    const dispatch = useAppDispatch()
    const { trainingsUser } = useAppSelector(trainingUserSelector)
    const { cultivatesUser } = useAppSelector(cultivateUserSelector)
    const { foreignsUser } = useAppSelector(foreignUserSelector);
    const { domesticsUser } = useAppSelector(domesticUserSelector);
    const { familys } = useAppSelector(familySelector)
    const id = localStorage.getItem('cbId')
    useEffect(() => {
        dispatch(getTrainingUsers({ keyword: '', cbId: id, levelTrainOption: null, typeTrainOption: null }))
        dispatch(getCultivateUsers({ keyword: '', cbId: id, cultivateOption: null }))
        dispatch(getAll({ cbId: id }));
        dispatch(getForeigns({ keyword: '', cbId: id }))
        dispatch(getDomestic({ keyword: '', cbId: id }))
    }, [id])
    let string = document.getElementById('content');
    let contentToPrint: any = string?.outerHTML.toString();
    const printTrainingUser = trainingsUser.map((value, index) =>
    (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.noiDaoTao}</p>
            </td>
            <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.nganhDaoTao}</p>
            </td>
            <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p className="s2" style={{ paddingLeft: '4pt', paddingRight: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                    {moment(value?.thoiGianBD).format('MM')}/{moment(value?.thoiGianBD).format('YYYY')}-{moment(value?.thoiGianKT).format('MM')}/{moment(value?.thoiGianKT).format('YYYY')}</p>
            </td>
            <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.Bac_dao_tao?.tenBac}</p>
            </td>
            <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.DM_he_dao_tao?.tenHeDaoTao}</p>
            </td>
        </tr>
    ))
    const printCultivateUser = cultivatesUser.map((value, index) =>
    (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.noiBoiDuong}</p>
            </td>
            <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.noiDungBoiDuong}</p>
            </td>
            <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p className="s2" style={{ paddingLeft: '4pt', paddingRight: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                    {moment(value?.boiDuongTuNgay).format('MM')}/{moment(value?.boiDuongDenNgay).format('YYYY')}-{moment(value?.boiDuongDenNgay).format('MM')}/{moment(value?.boiDuongDenNgay).format('YYYY')}</p>
            </td>
            <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.DM_Hinh_Thuc_BD?.tenHinhThuc}</p>
            </td>
            <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>{value.chungChiBoiDuong}</p>
            </td>
        </tr>
    ))
    const printFamilyUser = familys.map((value: family, index) => (
        <tr style={{ height: '23pt' }} key={index}>
            <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {value.Quan_he?.tenQuanHe}
            </td>
            <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {value.hovaten}
            </td>
            <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {value.namSinh}
            </td>
            <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                Quê quán: {value.queQuan}, Nơi ở: {value.noiO}, Nghề nghiệp: {value.ngheNghiep}, Đơn vị công tác: {value.donViCongTacHocTap}
            </td>
        </tr>
    ))
    const printForeign = foreignsUser.map((value: foreign, index) => (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {moment(value.ngayDi).format('YYYY')}-{moment(value.ngayVe).format('YYYY')}
            </td>
            <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                Quốc gia: {value.quocGia}, Nơi đến: {value.noiden}, Ngành học: {value.nganhHoc}, Ngày đi: {moment(value.ngayDi).format('DD/MM/YYYY')}, Ngày về: {moment(value.ngayVe).format('DD/MM/YYYY')}
            </td>
        </tr>
    ))
    const printDomestic = domesticsUser.map((value: business, index) => (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {value.thoiGianCT}
            </td>
            <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                Đơn vị công tác: {value.donViCT}, Chức danh: {value.chucDanh}, Chức vụ: {value.chucVu}, Chuyên môn: {value.chuyenMon}
            </td>
        </tr>
    ))
    const saveWord = () => {
        asBlob(contentToPrint).then((data: any) => {
            saveAs(data, 'file.docx') // save as docx file
        }) // asBlob() return Promise<Blob|Buffer>
    }
    return (
        <div>
            <Button
                onClick={saveWord}
                style={{
                    marginLeft: '2%',
                    borderRadius: 5
                }}
                type='primary'
                size='large'
            >
                Print
            </Button>
            <div id='content'>
                <p className="s1" style={{ paddingTop: '3pt', textIndent: '0pt', textAlign: 'right' }}>Mẫu 2C-BNV/2008</p>
                <p style={{ paddingTop: '6pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '141%', textAlign: 'left' }}>Cơ quan, đơn vị
                    có thẩm quyền quản lý CBCC …………………………………………. <br />Cơ quan, đơn vị sử dụng CBCC ………………………………………………………….</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <h1 style={{ paddingLeft: '97pt', textIndent: '0pt', marginLeft: '-1rem' }}>SƠ YẾU LÝ LỊCH CÁN BỘ, CÔNG CHỨC</h1>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                    <tbody>
                        <tr style={{ height: '125pt' }}>
                            <td style={{ width: '79pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                <p className="s2" style={{ textAlign: 'left', marginTop: -40 }}>
                                    <img src={'http://localhost:4444/' + user?.hinh_anh.slice(4, 200)} width='151.181' height={'226.771'} />
                                </p>
                            </td>
                            <td style={{ width: '377pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt' }}>
                                <ol id="l1">
                                    <li data-list-text="1)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Họ và tên khai sinh (viết chữ in hoa): {user?.ho + ' ' + user?.ten}</p>
                                    </li>
                                    <li data-list-text="2)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Tên gọi khác:
                                            ......................................................................</p>
                                    </li>
                                    <li data-list-text="3)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Sinh ngày: {moment(user?.ngay_sinh).format('DD')} tháng {moment(user?.ngay_sinh).format('MM')} năm {moment(user?.ngay_sinh).format('YYYY')}, Giới tính (nam, nữ): {user?.phai === 1 ? 'Nam' : 'Nữ'}</p>
                                    </li>
                                    <li data-list-text="4)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Nơi sinh: Xã {user?.xa_phuong}, Huyện {user?.quan_huyen}, Tỉnh {user?.tinh_tp}</p>
                                    </li>
                                    <li data-list-text="5)">
                                        <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Quê quán: Xã {user?.xa_phuong}, Huyện {user?.quan_huyen}, Tỉnh {user?.tinh_tp}</p>
                                    </li>
                                </ol>
                            </td>
                        </tr>
                    </tbody></table>
                <p style={{ paddingTop: '1pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>6) Dân tộc: {user?.DM_dan_toc.ten_dan_toc}, 7) Tôn
                    giáo: {user?.DM_ton_giao.ten_ton_giao}</p>
                <ol id="l2">
                    <li data-list-text="8)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '25pt', textIndent: '-14pt', textAlign: 'left' }}>Nơi đăng ký bộ khẩu
                            thường trú: {user?.ho_khau_thuong_tru}</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Số nhà, đường phố, thành
                            phố, xóm, thôn, xã, huyện, tỉnh)</p>
                    </li>
                    <li data-list-text="9)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '25pt', textIndent: '-14pt', textAlign: 'left' }}>Nơi ở hiện nay:
                            {user?.dia_chi}
                        </p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Số nhà, đường phố, thành
                            phố, xóm, thôn, xã, huyện, tỉnh)</p>
                    </li>
                    <li data-list-text="10)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Nghề nghiệp khi được
                            tuyển dụng: {user?.nghe_nghiep_tuyen_dung}</p>
                    </li>
                    <li data-list-text="11)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ngày tuyển dụng: {moment(user?.ngay_vao_truong).format('DD')} / {moment(user?.ngay_vao_truong).format('MM')} / {moment(user?.ngay_vao_truong).format('YYYY')},
                            Cơ quan tuyển dụng: {user?.co_quan_cong_tac}</p>
                    </li>
                    <li data-list-text="12)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Chức vụ (chức danh) hiện
                            tại: {user?.fk_chuc_vu}</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Về chính quyền hoặc Đảng,
                            đoàn thể, kể cả chức vụ kiêm nhiệm)</p>
                    </li>
                    <li data-list-text="13)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Công việc chính được
                            giao: {user?.cong_viec_chinh}</p>
                    </li>
                    <li data-list-text="14)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '127%', textAlign: 'left' }}>Ngạch
                            công chức (viên chức): {user?.fk_id_ngach}, Mã ngạch: {user?.fk_id_ngach} Bậc lương:……, Hệ số:{user?.he_so_luong}, Ngày
                            hưởng:…/…/……,</p>
                    </li>
                </ol>
                <p style={{ paddingLeft: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>Phụ cấp chức vụ:……, Phụ cấp khác:
                    ……</p>
                <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '127%', textAlign: 'left' }}>15.1- Trình độ
                    giáo dục phổ thông : {tdptOption.find(Value => Value.value === user?.fk_td_pho_thong)?.label} {user?.hvpt_lop}/{user?.hvpt_he} <br />15.2- Trình độ chuyên môn cao
                    nhất: {user?.Hoc_vi.ten} {user?.Hoc_ham.ten} {user?.chuyen_mon}</p>
                <p style={{ paddingLeft: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(TSKH, TS, Ths, cử nhân, kỹ sư,
                    cao đẳng, trung cấp, sơ cấp, chuyên ngành)</p>
                <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>15.3- Lý luận chính trị: {llctOption.find(Value => Value.value === user?.fk_ma_trinh_do_llct)?.label}
                    15.4-Quản lý nhà nước: {qlnnOption.find(Value => Value.value === user?.fk_ma_trinh_do_qlnn)?.label}</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '8.964pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '30pt' }}>
                        <td style={{ width: '243pt' }}>
                            <p className="s2" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>(Cao cấp,
                                trung cấp, sơ cấp và tương đương)</p>
                        </td>
                        <td style={{ width: '190pt' }}>
                            <p className="s2" style={{ paddingLeft: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(chuyên
                                viên cao cấp, chuyên viên</p>
                            <p className="s2" style={{ paddingLeft: '8pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>chính,
                                chuyên viên, cán sự, )</p>
                        </td>
                    </tr>
                    </tbody></table>
                <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>15.5- Ngoại ngữ:{user?.chung_chi_tieng_dan_toc},
                    15.6-Tin học: {tdthOption.find(Value => Value.value === user?.fk_ma_tdo_tin_hoc)?.label}</p>
                <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Tên ngoại ngữ + Trình độ A, B, C,
                    D......) (Trình độ A, B, C, )</p>
                <ol id="l3">
                    <li data-list-text="16)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ngày vào Đảng Cộng sản
                            Việt Nam:{moment(user?.ngay_vao_dang).format('DD/MM/YYYY')}, Ngày chính thức:{moment(user?.ngay_vao_dang_chinh_thuc).format('DD/MM/YYYY')}</p>
                    </li>
                    <li data-list-text="17)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ngày tham gia tổ chức
                            chính trị - xã hội: ...............................................................</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Ngày tham gia tổ chức:
                            Đoàn, Hội, và làm việc gì trong tổ chức đó)</p>
                    </li>
                    <li data-list-text="18)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ngày nhập ngũ:{moment(user?.ngay_nhap_ngu).format('DD/MM/YYYY')},
                            Ngày xuất ngũ: {moment(user?.ngay_xuat_ngu).format('DD/MM/YYYY')} Quân hàm cao nhất: {user?.quan_ham_cao_nhat}</p>
                    </li>
                    <li data-list-text="19)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Danh hiệu được phong
                            tặng cao nhất .....................................................................</p>
                        <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Anh hùng lao động, anh
                            hùng lực lượng vũ trang; nhà giáo, thày thuốc, nghệ sĩ nhân dân và ưu tú, …)</p>
                    </li>
                    <li data-list-text="20)">
                        <p style={{ paddingTop: '3pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Sở trường công tác:
                            {user?.nang_luc_so_truong_nk}</p>
                    </li>
                    <li data-list-text="21)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Khen thưởng: ……………………,
                            22) Kỷ luật: ....................................................</p>
                    </li>
                </ol>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '8.964pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '30pt' }}>
                        <td style={{ width: '180pt' }}>
                            <p className="s2" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>(Hình thức
                                cao nhất, năm nào)</p>
                        </td>
                        <td style={{ width: '262pt' }}>
                            <p className="s2" style={{ paddingLeft: '19pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(về đảng,
                                chính quyền, đoàn thể hình thức cao</p>
                            <p className="s2" style={{ paddingLeft: '19pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>nhất, năm
                                nào)</p>
                        </td>
                    </tr>
                    </tbody></table>
                <ol id="l4">
                    <li data-list-text="23)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Tình trạng sức khoẻ: {user?.tinh_trang_suc_khoe},
                            Chiều cao:{user?.chieu_cao}cm, Cân nặng:{user?.can_nang}.kg, Nhóm máu:{user?.nhom_mau}</p>
                    </li>
                    <li data-list-text="24)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Là thương binh hạng:
                            …./……, Là con gia đình chính sách: .................................</p>
                        <p style={{ paddingTop: '6pt', paddingLeft: '198pt', textIndent: '0pt', textAlign: 'left' }}>(Con thương binh, con
                            liệt sĩ, người nhiễm chất độc da cam Dioxin)</p>
                    </li>
                    <li data-list-text="25)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Số chứng minh nhân dân: {user?.so_cmnd}
                            Ngày cấp: {moment(user?.ngay_cap).format('DD')} / {moment(user?.ngay_cap).format('MM')} / {moment(user?.ngay_cap).format('YYYY')}</p>
                    </li>
                    <li data-list-text="26)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Số sổ BHXH:
                            ........................................................................................................
                        </p>
                    </li>
                    <li data-list-text="27)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Đào tạo, bồi dưỡng về
                            chuyên môn, nghiệp vụ, lý luận chính trị, ngoại ngữ, tin học</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '45pt' }}>
                                <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '15pt', textIndent: '0pt', textAlign: 'left' }}>Tên trường</p>
                                </td>
                                <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '22pt', textIndent: '-10pt', textAlign: 'left' }}>
                                        Chuyên ngành đào tạo, bồi dưỡng</p>
                                </td>
                                <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '12pt', textIndent: '-1pt', textAlign: 'left' }}>Từ
                                        tháng, năm -đến tháng, năm</p>
                                </td>
                                <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '14pt', paddingRight: '7pt', textIndent: '-7pt', textAlign: 'left' }}>
                                        Hình thức đào tạo</p>
                                </td>
                                <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '16pt', paddingRight: '15pt', textIndent: '0pt', textAlign: 'left' }}>
                                        Văn bằng, chứng chỉ,</p>
                                    <p className="s2" style={{ paddingLeft: '16pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>
                                        trình độ gì</p>
                                </td>
                            </tr>
                                {printTrainingUser}
                                {printCultivateUser}
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p className="s2" style={{ paddingLeft: '4pt', paddingRight: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                            …/……-…/……</p>
                                    </td>
                                    <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p className="s2" style={{ paddingLeft: '4pt', paddingRight: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                            …/……-…/……</p>
                                    </td>
                                    <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p className="s2" style={{ paddingLeft: '4pt', paddingRight: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                            …/……-…/……</p>
                                    </td>
                                    <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                        <p className="s3" style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>Ghi chú: <span className="p">Hình thức đào tạo: Chính quy, tại chức, chuyên tu, bồi dưỡng / Văn bằng:</span></p>
                        <p style={{ paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>TSKH, TS, Ths, Cử nhân, Kỹ sư ............
                        </p>
                    </li>
                    <li data-list-text="28)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Tóm tắt quá trình công
                            tác</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '45pt' }}>
                                <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '31pt', textIndent: '-20pt', textAlign: 'left' }}>
                                        Từ tháng, năm đến tháng, năm</p>
                                </td>
                                <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '10pt', textIndent: '1pt', lineHeight: '15pt', textAlign: 'left' }}>
                                        Chức danh, chức vụ, đơn vị công tác (đảng, chính quyền, đoàn</p>
                                    <p className="s2" style={{ paddingLeft: '102pt', textIndent: '-92pt', lineHeight: '15pt', textAlign: 'left' }}>thể, tổ
                                        chức xã hội), kể cả thời gian được đào tạo, bồi dưỡng về chuyên môn, nghiệp vụ,......</p>
                                </td>
                            </tr>
                                {printForeign}
                                {printDomestic}
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '20pt' }}>
                                <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                            </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                    </li>
                    <li data-list-text="29)">
                        <p style={{ paddingTop: '6pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Đặc điểm lịch sử bản
                            thân:</p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>- Khai rõ: bị bắt, bị tù
                            (từ ngày tháng năm nào đến ngày tháng năm nào, ở đâu), đã khai báo cho ai, những vấn đề gì? Bản thân có
                            làm việc trong chế độ cũ (cơ quan, đơn vị nào, địa điểm, chức danh, chức vụ, thời gian làm việc )</p>
                        <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                        <ul id="l5">
                            <li data-list-text="-">
                                <p style={{ paddingTop: '6pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>Tham gia hoặc có
                                    quan hệ với các tổ chức chính trị, kinh tế, xã hội nào ở nước ngoài (làm gì, tổ chức nào, đặt
                                    trụ sở ở đâu ?):</p>
                                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                                    .....................................................................................................................................
                                </p>
                                <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                                    .....................................................................................................................................
                                </p>
                            </li>
                            <li data-list-text="-">
                                <p className="s4" style={{ paddingTop: '5pt', paddingLeft: '18pt', textIndent: '-7pt', textAlign: 'left' }}>Có
                                    thân nhân (Cha, Mẹ, Vợ, Chồng, con, anh chị em ruột) ở nước ngoài (làm gì, địa chỉ)?</p>
                            </li>
                        </ul>
                        <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                            .....................................................................................................................................
                        </p>
                    </li>
                    <li data-list-text="30)">
                        <p style={{ paddingTop: '6pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Quan hệ gia đình</p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>a) Về bản thân: Cha, Mẹ,
                            Vợ (hoặc chồng), các con, anh chị em ruột</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '60pt' }}>
                                <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '6pt', paddingRight: '5pt', textIndent: '9pt', textAlign: 'left' }}>
                                        Mối quan hệ</p>
                                </td>
                                <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '32pt', textIndent: '0pt', textAlign: 'left' }}>Họ và tên</p>
                                </td>
                                <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '15pt', textIndent: '-1pt', textAlign: 'left' }}>Năm sinh
                                    </p>
                                </td>
                                <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '0pt', textAlign: 'center' }}>Quê
                                        quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong,</p>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                        ngoài nước); thành viên các tổ chức chính trị - xã hội )</p>
                                </td>
                            </tr>

                                {printFamilyUser}
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                        <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>a) Về bên vợ (hoặc chồng):
                            Cha, Mẹ, anh chị em ruột</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '60pt' }}>
                                <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '6pt', paddingRight: '5pt', textIndent: '9pt', textAlign: 'left' }}>
                                        Mối quan hệ</p>
                                </td>
                                <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '32pt', textIndent: '0pt', textAlign: 'left' }}>Họ và tên</p>
                                </td>
                                <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '15pt', textIndent: '-1pt', textAlign: 'left' }}>Năm sinh
                                    </p>
                                </td>
                                <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '3pt', textAlign: 'justify' }}>Quê
                                        quán, nghề nghiệp, chức danh, chức vụ, đơn vị công tác, học tập, nơi ở (trong, ngoài nước);
                                        thành viên các tổ chức chính</p>
                                    <p className="s2" style={{ paddingLeft: '76pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'justify' }}>trị - xã
                                        hội )</p>
                                </td>
                            </tr>

                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '20pt' }}>
                                    <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                    </li>
                    <li data-list-text="31)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Diễn biến quá trình
                            lương của cán bộ, công chức</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '23pt' }}>
                                <td style={{ width: '85pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>
                                        Tháng/năm</p>
                                </td>
                                <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '43pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '37pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '38pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '46pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                                <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                </td>
                            </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '85pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>Mã
                                            ngạch/bậc</p>
                                    </td>
                                    <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '43pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '37pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '38pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '46pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                                <tr style={{ height: '23pt' }}>
                                    <td style={{ width: '85pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>Hệ
                                            số lương</p>
                                    </td>
                                    <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '43pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '37pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '40pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '38pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '46pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '47pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                    </li>
                    <li data-list-text="32)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Nhận xét, đánh giá của
                            cơ quan, đơn vị quản lý và sử dụng cán bộ, công chức</p>
                    </li>
                </ol>
                <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                    .....................................................................................................................................
                </p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <p style={{ paddingLeft: '188pt', textIndent: '0pt', textAlign: 'left', fontSize: '16px' }}>………………<i>. Ngày</i>……. <i>tháng</i>…… <i>năm
                </i>………</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '14.724pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '59pt' }}>
                        <td style={{ width: '181pt' }}>
                            <p className="s5" style={{ paddingLeft: '17pt', paddingRight: '45pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'center' }}>
                                Người khai</p>
                            <p className="s2" style={{ paddingLeft: '2pt', paddingRight: '30pt', textIndent: '0pt', textAlign: 'center' }}>Tôi xin
                                cam đoan những lời khai trên đây là đúng sự thật</p>
                            <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '45pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'center' }}>
                                (Ký tên, ghi rõ họ tên)</p>
                        </td>
                        <td style={{ width: '232pt' }}>
                            <p className="s5" style={{ paddingLeft: '30pt', paddingRight: '2pt', textIndent: '0pt', textAlign: 'center' }}>Thủ
                                trưởng cơ quan, đơn vị quản lý và sử dụng CBCC</p>
                            <p className="s6" style={{ paddingLeft: '30pt', paddingRight: '2pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                (Ký tên, đóng dấu)</p>
                        </td>
                    </tr>
                    </tbody></table>


            </div>
        </div>

    )
}

export default CV