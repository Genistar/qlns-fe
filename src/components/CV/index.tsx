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
                Qu?? qu??n: {value.queQuan}, N??i ???: {value.noiO}, Ngh??? nghi???p: {value.ngheNghiep}, ????n v??? c??ng t??c: {value.donViCongTacHocTap}
            </td>
        </tr>
    ))
    const printForeign = foreignsUser.map((value: foreign, index) => (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {moment(value.ngayDi).format('YYYY')}-{moment(value.ngayVe).format('YYYY')}
            </td>
            <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                Qu???c gia: {value.quocGia}, N??i ?????n: {value.noiden}, Ng??nh h???c: {value.nganhHoc}, Ng??y ??i: {moment(value.ngayDi).format('DD/MM/YYYY')}, Ng??y v???: {moment(value.ngayVe).format('DD/MM/YYYY')}
            </td>
        </tr>
    ))
    const printDomestic = domesticsUser.map((value: business, index) => (
        <tr style={{ height: '20pt' }} key={index}>
            <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                {value.thoiGianCT}
            </td>
            <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                ????n v??? c??ng t??c: {value.donViCT}, Ch???c danh: {value.chucDanh}, Ch???c v???: {value.chucVu}, Chuy??n m??n: {value.chuyenMon}
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
                <p className="s1" style={{ paddingTop: '3pt', textIndent: '0pt', textAlign: 'right' }}>M???u 2C-BNV/2008</p>
                <p style={{ paddingTop: '6pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '141%', textAlign: 'left' }}>C?? quan, ????n v???
                    c?? th???m quy???n qu???n l?? CBCC ????????????????????????????????????????????????. <br />C?? quan, ????n v??? s??? d???ng CBCC ??????????????????????????????????????????????????????????????????.</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <h1 style={{ paddingLeft: '97pt', textIndent: '0pt', marginLeft: '-1rem' }}>S?? Y???U L?? L???CH C??N B???, C??NG CH???C</h1>
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
                                            H??? v?? t??n khai sinh (vi???t ch??? in hoa): {user?.ho + ' ' + user?.ten}</p>
                                    </li>
                                    <li data-list-text="2)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            T??n g???i kh??c:
                                            ......................................................................</p>
                                    </li>
                                    <li data-list-text="3)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Sinh ng??y: {moment(user?.ngay_sinh).format('DD')} th??ng {moment(user?.ngay_sinh).format('MM')} n??m {moment(user?.ngay_sinh).format('YYYY')}, Gi???i t??nh (nam, n???): {user?.phai === 1 ? 'Nam' : 'N???'}</p>
                                    </li>
                                    <li data-list-text="4)">
                                        <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            N??i sinh: X?? {user?.xa_phuong}, Huy???n {user?.quan_huyen}, T???nh {user?.tinh_tp}</p>
                                    </li>
                                    <li data-list-text="5)">
                                        <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '19pt', textIndent: '-14pt', textAlign: 'left' }}>
                                            Qu?? qu??n: X?? {user?.xa_phuong}, Huy???n {user?.quan_huyen}, T???nh {user?.tinh_tp}</p>
                                    </li>
                                </ol>
                            </td>
                        </tr>
                    </tbody></table>
                <p style={{ paddingTop: '1pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>6) D??n t???c: {user?.DM_dan_toc.ten_dan_toc}, 7) T??n
                    gi??o: {user?.DM_ton_giao.ten_ton_giao}</p>
                <ol id="l2">
                    <li data-list-text="8)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '25pt', textIndent: '-14pt', textAlign: 'left' }}>N??i ????ng k?? b??? kh???u
                            th?????ng tr??: {user?.ho_khau_thuong_tru}</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(S??? nh??, ???????ng ph???, th??nh
                            ph???, x??m, th??n, x??, huy???n, t???nh)</p>
                    </li>
                    <li data-list-text="9)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '25pt', textIndent: '-14pt', textAlign: 'left' }}>N??i ??? hi???n nay:
                            {user?.dia_chi}
                        </p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(S??? nh??, ???????ng ph???, th??nh
                            ph???, x??m, th??n, x??, huy???n, t???nh)</p>
                    </li>
                    <li data-list-text="10)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ngh??? nghi???p khi ???????c
                            tuy???n d???ng: {user?.nghe_nghiep_tuyen_dung}</p>
                    </li>
                    <li data-list-text="11)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ng??y tuy???n d???ng: {moment(user?.ngay_vao_truong).format('DD')} / {moment(user?.ngay_vao_truong).format('MM')} / {moment(user?.ngay_vao_truong).format('YYYY')},
                            C?? quan tuy???n d???ng: {user?.co_quan_cong_tac}</p>
                    </li>
                    <li data-list-text="12)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ch???c v??? (ch???c danh) hi???n
                            t???i: {user?.fk_chuc_vu}</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(V??? ch??nh quy???n ho???c ?????ng,
                            ??o??n th???, k??? c??? ch???c v??? ki??m nhi???m)</p>
                    </li>
                    <li data-list-text="13)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>C??ng vi???c ch??nh ???????c
                            giao: {user?.cong_viec_chinh}</p>
                    </li>
                    <li data-list-text="14)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '127%', textAlign: 'left' }}>Ng???ch
                            c??ng ch???c (vi??n ch???c): {user?.fk_id_ngach}, M?? ng???ch: {user?.fk_id_ngach} B???c l????ng:??????, H??? s???:{user?.he_so_luong}, Ng??y
                            h?????ng:???/???/??????,</p>
                    </li>
                </ol>
                <p style={{ paddingLeft: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>Ph??? c???p ch???c v???:??????, Ph??? c???p kh??c:
                    ??????</p>
                <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', lineHeight: '127%', textAlign: 'left' }}>15.1- Tr??nh ?????
                    gi??o d???c ph??? th??ng : {tdptOption.find(Value => Value.value === user?.fk_td_pho_thong)?.label} {user?.hvpt_lop}/{user?.hvpt_he} <br />15.2- Tr??nh ????? chuy??n m??n cao
                    nh???t: {user?.Hoc_vi.ten} {user?.Hoc_ham.ten} {user?.chuyen_mon}</p>
                <p style={{ paddingLeft: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(TSKH, TS, Ths, c??? nh??n, k??? s??,
                    cao ?????ng, trung c???p, s?? c???p, chuy??n ng??nh)</p>
                <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>15.3- L?? lu???n ch??nh tr???: {llctOption.find(Value => Value.value === user?.fk_ma_trinh_do_llct)?.label}
                    15.4-Qu???n l?? nh?? n?????c: {qlnnOption.find(Value => Value.value === user?.fk_ma_trinh_do_qlnn)?.label}</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '8.964pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '30pt' }}>
                        <td style={{ width: '243pt' }}>
                            <p className="s2" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>(Cao c???p,
                                trung c???p, s?? c???p v?? t????ng ??????ng)</p>
                        </td>
                        <td style={{ width: '190pt' }}>
                            <p className="s2" style={{ paddingLeft: '8pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(chuy??n
                                vi??n cao c???p, chuy??n vi??n</p>
                            <p className="s2" style={{ paddingLeft: '8pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>ch??nh,
                                chuy??n vi??n, c??n s???, )</p>
                        </td>
                    </tr>
                    </tbody></table>
                <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>15.5- Ngo???i ng???:{user?.chung_chi_tieng_dan_toc},
                    15.6-Tin h???c: {tdthOption.find(Value => Value.value === user?.fk_ma_tdo_tin_hoc)?.label}</p>
                <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(T??n ngo???i ng??? + Tr??nh ????? A, B, C,
                    D......) (Tr??nh ????? A, B, C, )</p>
                <ol id="l3">
                    <li data-list-text="16)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ng??y v??o ?????ng C???ng s???n
                            Vi???t Nam:{moment(user?.ngay_vao_dang).format('DD/MM/YYYY')}, Ng??y ch??nh th???c:{moment(user?.ngay_vao_dang_chinh_thuc).format('DD/MM/YYYY')}</p>
                    </li>
                    <li data-list-text="17)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ng??y tham gia t??? ch???c
                            ch??nh tr??? - x?? h???i: ...............................................................</p>
                        <p style={{ paddingTop: '4pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Ng??y tham gia t??? ch???c:
                            ??o??n, H???i, v?? l??m vi???c g?? trong t??? ch???c ????)</p>
                    </li>
                    <li data-list-text="18)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Ng??y nh???p ng??:{moment(user?.ngay_nhap_ngu).format('DD/MM/YYYY')},
                            Ng??y xu???t ng??: {moment(user?.ngay_xuat_ngu).format('DD/MM/YYYY')} Qu??n h??m cao nh???t: {user?.quan_ham_cao_nhat}</p>
                    </li>
                    <li data-list-text="19)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Danh hi???u ???????c phong
                            t???ng cao nh???t .....................................................................</p>
                        <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>(Anh h??ng lao ?????ng, anh
                            h??ng l???c l?????ng v?? trang; nh?? gi??o, th??y thu???c, ngh??? s?? nh??n d??n v?? ??u t??, ???)</p>
                    </li>
                    <li data-list-text="20)">
                        <p style={{ paddingTop: '3pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>S??? tr?????ng c??ng t??c:
                            {user?.nang_luc_so_truong_nk}</p>
                    </li>
                    <li data-list-text="21)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Khen th?????ng: ????????????????????????,
                            22) K??? lu???t: ....................................................</p>
                    </li>
                </ol>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '8.964pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '30pt' }}>
                        <td style={{ width: '180pt' }}>
                            <p className="s2" style={{ paddingLeft: '2pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>(H??nh th???c
                                cao nh???t, n??m n??o)</p>
                        </td>
                        <td style={{ width: '262pt' }}>
                            <p className="s2" style={{ paddingLeft: '19pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>(v??? ?????ng,
                                ch??nh quy???n, ??o??n th??? h??nh th???c cao</p>
                            <p className="s2" style={{ paddingLeft: '19pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>nh???t, n??m
                                n??o)</p>
                        </td>
                    </tr>
                    </tbody></table>
                <ol id="l4">
                    <li data-list-text="23)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>T??nh tr???ng s???c kho???: {user?.tinh_trang_suc_khoe},
                            Chi???u cao:{user?.chieu_cao}cm, C??n n???ng:{user?.can_nang}.kg, Nh??m m??u:{user?.nhom_mau}</p>
                    </li>
                    <li data-list-text="24)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>L?? th????ng binh h???ng:
                            ???./??????, L?? con gia ????nh ch??nh s??ch: .................................</p>
                        <p style={{ paddingTop: '6pt', paddingLeft: '198pt', textIndent: '0pt', textAlign: 'left' }}>(Con th????ng binh, con
                            li???t s??, ng?????i nhi???m ch???t ?????c da cam Dioxin)</p>
                    </li>
                    <li data-list-text="25)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>S??? ch???ng minh nh??n d??n: {user?.so_cmnd}
                            Ng??y c???p: {moment(user?.ngay_cap).format('DD')} / {moment(user?.ngay_cap).format('MM')} / {moment(user?.ngay_cap).format('YYYY')}</p>
                    </li>
                    <li data-list-text="26)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>S??? s??? BHXH:
                            ........................................................................................................
                        </p>
                    </li>
                    <li data-list-text="27)">
                        <p style={{ paddingTop: '4pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>????o t???o, b???i d?????ng v???
                            chuy??n m??n, nghi???p v???, l?? lu???n ch??nh tr???, ngo???i ng???, tin h???c</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '45pt' }}>
                                <td style={{ width: '90pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '15pt', textIndent: '0pt', textAlign: 'left' }}>T??n tr?????ng</p>
                                </td>
                                <td style={{ width: '121pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '22pt', textIndent: '-10pt', textAlign: 'left' }}>
                                        Chuy??n ng??nh ????o t???o, b???i d?????ng</p>
                                </td>
                                <td style={{ width: '105pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '12pt', textIndent: '-1pt', textAlign: 'left' }}>T???
                                        th??ng, n??m -?????n th??ng, n??m</p>
                                </td>
                                <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '14pt', paddingRight: '7pt', textIndent: '-7pt', textAlign: 'left' }}>
                                        H??nh th???c ????o t???o</p>
                                </td>
                                <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '16pt', paddingRight: '15pt', textIndent: '0pt', textAlign: 'left' }}>
                                        V??n b???ng, ch???ng ch???,</p>
                                    <p className="s2" style={{ paddingLeft: '16pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'left' }}>
                                        tr??nh ????? g??</p>
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
                                            ???/??????-???/??????</p>
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
                                            ???/??????-???/??????</p>
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
                                            ???/??????-???/??????</p>
                                    </td>
                                    <td style={{ width: '67pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                    <td style={{ width: '87pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    </td>
                                </tr>
                            </tbody></table>
                        <p className="s3" style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>Ghi ch??: <span className="p">H??nh th???c ????o t???o: Ch??nh quy, t???i ch???c, chuy??n tu, b???i d?????ng / V??n b???ng:</span></p>
                        <p style={{ paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>TSKH, TS, Ths, C??? nh??n, K??? s?? ............
                        </p>
                    </li>
                    <li data-list-text="28)">
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>T??m t???t qu?? tr??nh c??ng
                            t??c</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '45pt' }}>
                                <td style={{ width: '120pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingTop: '7pt', paddingLeft: '31pt', textIndent: '-20pt', textAlign: 'left' }}>
                                        T??? th??ng, n??m ?????n th??ng, n??m</p>
                                </td>
                                <td style={{ width: '350pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '10pt', textIndent: '1pt', lineHeight: '15pt', textAlign: 'left' }}>
                                        Ch???c danh, ch???c v???, ????n v??? c??ng t??c (?????ng, ch??nh quy???n, ??o??n</p>
                                    <p className="s2" style={{ paddingLeft: '102pt', textIndent: '-92pt', lineHeight: '15pt', textAlign: 'left' }}>th???, t???
                                        ch???c x?? h???i), k??? c??? th???i gian ???????c ????o t???o, b???i d?????ng v??? chuy??n m??n, nghi???p v???,......</p>
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
                        <p style={{ paddingTop: '6pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>?????c ??i???m l???ch s??? b???n
                            th??n:</p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>- Khai r??: b??? b???t, b??? t??
                            (t??? ng??y th??ng n??m n??o ?????n ng??y th??ng n??m n??o, ??? ????u), ???? khai b??o cho ai, nh???ng v???n ????? g??? B???n th??n c??
                            l??m vi???c trong ch??? ????? c?? (c?? quan, ????n v??? n??o, ?????a ??i???m, ch???c danh, ch???c v???, th???i gian l??m vi???c )</p>
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
                                <p style={{ paddingTop: '6pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>Tham gia ho???c c??
                                    quan h??? v???i c??c t??? ch???c ch??nh tr???, kinh t???, x?? h???i n??o ??? n?????c ngo??i (l??m g??, t??? ch???c n??o, ?????t
                                    tr??? s??? ??? ????u ?):</p>
                                <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                                    .....................................................................................................................................
                                </p>
                                <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '0pt', textAlign: 'left' }}>
                                    .....................................................................................................................................
                                </p>
                            </li>
                            <li data-list-text="-">
                                <p className="s4" style={{ paddingTop: '5pt', paddingLeft: '18pt', textIndent: '-7pt', textAlign: 'left' }}>C??
                                    th??n nh??n (Cha, M???, V???, Ch???ng, con, anh ch??? em ru???t) ??? n?????c ngo??i (l??m g??, ?????a ch???)?</p>
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
                        <p style={{ paddingTop: '6pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Quan h??? gia ????nh</p>
                        <p style={{ paddingTop: '5pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>a) V??? b???n th??n: Cha, M???,
                            V??? (ho???c ch???ng), c??c con, anh ch??? em ru???t</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '60pt' }}>
                                <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '6pt', paddingRight: '5pt', textIndent: '9pt', textAlign: 'left' }}>
                                        M???i quan h???</p>
                                </td>
                                <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '32pt', textIndent: '0pt', textAlign: 'left' }}>H??? v?? t??n</p>
                                </td>
                                <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '15pt', textIndent: '-1pt', textAlign: 'left' }}>N??m sinh
                                    </p>
                                </td>
                                <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '0pt', textAlign: 'center' }}>Qu??
                                        qu??n, ngh??? nghi???p, ch???c danh, ch???c v???, ????n v??? c??ng t??c, h???c t???p, n??i ??? (trong,</p>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                        ngo??i n?????c); th??nh vi??n c??c t??? ch???c ch??nh tr??? - x?? h???i )</p>
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
                        <p style={{ paddingTop: '3pt', paddingLeft: '11pt', textIndent: '0pt', textAlign: 'left' }}>a) V??? b??n v??? (ho???c ch???ng):
                            Cha, M???, anh ch??? em ru???t</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '60pt' }}>
                                <td style={{ width: '54pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '6pt', paddingRight: '5pt', textIndent: '9pt', textAlign: 'left' }}>
                                        M???i quan h???</p>
                                </td>
                                <td style={{ width: '116pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '32pt', textIndent: '0pt', textAlign: 'left' }}>H??? v?? t??n</p>
                                </td>
                                <td style={{ width: '58pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                                    <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '15pt', textIndent: '-1pt', textAlign: 'left' }}>N??m sinh
                                    </p>
                                </td>
                                <td style={{ width: '243pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '11pt', paddingRight: '11pt', textIndent: '3pt', textAlign: 'justify' }}>Qu??
                                        qu??n, ngh??? nghi???p, ch???c danh, ch???c v???, ????n v??? c??ng t??c, h???c t???p, n??i ??? (trong, ngo??i n?????c);
                                        th??nh vi??n c??c t??? ch???c ch??nh</p>
                                    <p className="s2" style={{ paddingLeft: '76pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'justify' }}>tr??? - x??
                                        h???i )</p>
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
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Di???n bi???n qu?? tr??nh
                            l????ng c???a c??n b???, c??ng ch???c</p>
                        <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                        <table style={{ borderCollapse: 'collapse', marginLeft: '5.954pt' }} cellSpacing={0}>
                            <tbody><tr style={{ height: '23pt' }}>
                                <td style={{ width: '85pt', borderTopStyle: 'solid', borderTopWidth: '1pt', borderLeftStyle: 'solid', borderLeftWidth: '1pt', borderBottomStyle: 'solid', borderBottomWidth: '1pt', borderRightStyle: 'solid', borderRightWidth: '1pt' }}>
                                    <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>
                                        Th??ng/n??m</p>
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
                                        <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>M??
                                            ng???ch/b???c</p>
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
                                        <p className="s2" style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'left' }}>H???
                                            s??? l????ng</p>
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
                        <p style={{ paddingTop: '5pt', paddingLeft: '32pt', textIndent: '-20pt', textAlign: 'left' }}>Nh???n x??t, ????nh gi?? c???a
                            c?? quan, ????n v??? qu???n l?? v?? s??? d???ng c??n b???, c??ng ch???c</p>
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
                <p style={{ paddingLeft: '188pt', textIndent: '0pt', textAlign: 'left', fontSize: '16px' }}>??????????????????<i>. Ng??y</i>??????. <i>th??ng</i>?????? <i>n??m
                </i>?????????</p>
                <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                <table style={{ borderCollapse: 'collapse', marginLeft: '14.724pt' }} cellSpacing={0}>
                    <tbody><tr style={{ height: '59pt' }}>
                        <td style={{ width: '181pt' }}>
                            <p className="s5" style={{ paddingLeft: '17pt', paddingRight: '45pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'center' }}>
                                Ng?????i khai</p>
                            <p className="s2" style={{ paddingLeft: '2pt', paddingRight: '30pt', textIndent: '0pt', textAlign: 'center' }}>T??i xin
                                cam ??oan nh???ng l???i khai tr??n ????y l?? ????ng s??? th???t</p>
                            <p className="s2" style={{ paddingLeft: '17pt', paddingRight: '45pt', textIndent: '0pt', lineHeight: '14pt', textAlign: 'center' }}>
                                (K?? t??n, ghi r?? h??? t??n)</p>
                        </td>
                        <td style={{ width: '232pt' }}>
                            <p className="s5" style={{ paddingLeft: '30pt', paddingRight: '2pt', textIndent: '0pt', textAlign: 'center' }}>Th???
                                tr?????ng c?? quan, ????n v??? qu???n l?? v?? s??? d???ng CBCC</p>
                            <p className="s6" style={{ paddingLeft: '30pt', paddingRight: '2pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'center' }}>
                                (K?? t??n, ????ng d???u)</p>
                        </td>
                    </tr>
                    </tbody></table>


            </div>
        </div>

    )
}

export default CV