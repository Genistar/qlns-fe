import { Button } from 'antd';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver'
import React from 'react'
import { contract } from '../../../../../interface/contract'
import './contractWord.module.css'

type Props = {
    contractUser: contract | null;
    printPDF: () => void
}

const ContractWord = (props: Props) => {
    let { contractUser } = props;
    let string = document.getElementById('contentContract');
    let contentToPrint: any = string?.outerHTML.toString();
    const id = localStorage.getItem('cbId')
    const saveWord = () => {
        asBlob(contentToPrint).then((data: any) => {
            saveAs(data, 'contract.docx') // save as docx file
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
            <div id='contentContract'>
                <div>
                    <h2 style={{ paddingTop: '3pt', paddingLeft: '0pt', textIndent: '0pt', textAlign: 'center' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT
                        NAM</h2>
                    <h1 style={{ paddingTop: '6pt', paddingLeft: '0pt', textIndent: '0pt', textAlign: 'center' }}>Độc lập – Tự do – Hạnh phúc
                    </h1>
                    <h1 style={{ paddingTop: '5pt', paddingLeft: '0pt', textIndent: '0pt', textAlign: 'center' }}>---------</h1>
                    <h1 style={{ paddingTop: '6pt', paddingLeft: '0pt', textIndent: '0pt', textAlign: 'center' }}>HỢP ĐỒNG LAO ĐỘNG</h1>
                    <p className="s1" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', lineHeight: '140%', textAlign: 'left' }}>Căn cứ
                        Bộ luật lao động ngày 20 tháng 11 năm 2019; Căn cứ vào nhu cầu của các Bên</p>
                    <p style={{ paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Hôm nay, ngày... tháng... năm 2021, tại Công ty ,
                        chúng tôi gồm:</p>
                    <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Bên A : Người sử dụng
                        lao động</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Tên người đại diện:
                        {contractUser?.benA}</p>
                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Địa chỉ:
                        .......................................................................................</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điện thoại:{contractUser?.benADienThoai}</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Đại diện: {contractUser?.benADaiDienCho}
                        Chức vụ: Quốc tịch: Việt Nam</p>
                    <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Bên B : Người lao động
                    </p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', lineHeight: '140%', textAlign: 'left' }}>Ông/bà:
                        {contractUser?.BenB} Quốc tịch: {contractUser?.benAQuocTich}..</p>
                    <p style={{ paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Ngày sinh: ………………………….</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Nơi sinh: ………………………………….</p>
                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', lineHeight: '140%', textAlign: 'left' }}>Địa chỉ thường
                        trú: ………………………………………. Địa chỉ tạm trú: ………………………………………….</p>
                    <p style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '140%', textAlign: 'left' }}>Số CMND/CCCD: ……………. Cấp
                        ngày: …………… Tại: ………………….</p>
                    <p className="s1" style={{ paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Cùng thoả thuận ký kết Hợp đồng lao động
                        (HĐLĐ) và cam kết làm đúng những điều khoản sau đây:</p>
                    <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều 1<span className="h1">:
                        Công việc, địa điểm làm việc và thời hạn của Hợp đồng</span></p>
                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', lineHeight: '141%', textAlign: 'left' }}>Loại hợp đồng:
                        ……. tháng - Ký lần thứ …… Từ ngày:……………. Đến ngày: ……………</p>
                    <ul id="l1">
                        <li data-list-text="-">
                            <p style={{ paddingLeft: '12pt', textIndent: '-7pt', lineHeight: '15pt', textAlign: 'left' }}>Địa điểm làm việc:
                                ……………………………………………………</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Bộ phận công tác:</p>
                            <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Phòng
                                ………………..<i>………………………………</i></p>
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Chức danh chuyên môn (vị
                                trí công tác): <i>…………………….…………</i></p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Nhiệm vụ công việc như
                                sau:</p>
                            <p style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Thực hiện công việc theo
                                đúng chức danh chuyên môn của mình dưới sự quản lý, điều hành của Ban Giám đốc (và các cá nhân được bổ
                                nhiệm hoặc ủy quyền phụ trách).</p>
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Phối hợp cùng với các bộ
                                phận, phòng ban khác trong Người sử dụng lao động để phát huy tối đa hiệu quả công việc.</p>
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Hoàn thành những công
                                việc khác tùy thuộc theo yêu cầu kinh doanh của Người sử dụng lao động và theo quyết định của Ban Giám
                                đốc (và các cá nhân được bổ nhiệm hoặc ủy quyền phụ trách).</p>
                            <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều 2<span className="h1">: Lương, phụ cấp, các khoản bổ sung khác</span></p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Lương căn bản: ………………..
                            </p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Phụ cấp: ………………… ……</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Các khoản bổ sung khác:
                                tùy quy định cụ thể của Công ty</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Hình thức trả lương: Tiền
                                mặt hoặc chuyển khoản.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Thời hạn trả lương: Được
                                trả lương vào ngày … của tháng.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Chế độ nâng bậc, nâng
                                lương: Người lao động được xét nâng bậc, nâng lương theo kết quả làm việc và theo quy định của Người sử
                                dụng lao động.</p>
                            <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều 3<span className="h1">: Thời giờ làm việc, nghỉ ngơi, bảo hộ lao động, BHXH, BHYT, BHTN</span></p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Thời giờ làm việc: …
                                giờ/ngày, … giờ/tuần, Nghỉ hàng tuần: ngày ……</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Từ ngày Thứ …. đến ngày
                                Thứ …… hàng tuần:</p>
                            <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Buổi sáng : …………………</p>
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Buổi chiều: …………………</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '5pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Chế độ nghỉ ngơi các ngày
                                lễ, tết, phép năm:</p>
                            <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>+ Người lao động được
                                nghỉ lễ, tết theo luật định; các ngày nghỉ lễ nếu trùng với ngày nghỉ thì sẽ được nghỉ bù vào ngày trước
                                hoặc ngày kế tiếp tùy theo tình hình cụ thể mà Ban lãnh đạo Công ty sẽ chỉ đạo trực tiếp.</p>
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Người lao động đã ký HĐLĐ
                                chính thức và có thâm niên công tác 12 tháng thì sẽ được nghỉ phép năm có hưởng lương (01 ngày phép/01
                                tháng, 12 ngày phép/01 năm); trường hợp có thâm niên làm việc dưới 12 tháng thì thời gian nghỉ hằng năm
                                được tính theo tỷ lệ tương ứng với số thời gian làm việc.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Thiết bị và công cụ làm
                                việc sẽ được Công ty cấp phát tùy theo nhu cầu của công việc.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều kiện an toàn và vệ
                                sinh lao động tại nơi làm việc theo quy định của pháp luật hiện hành.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Bảo hiểm xã hội, bảo hiểm
                                y tế và bảo hiểm thất nghiệp: Theo quy định của pháp luật.</p>
                            <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều 4<span className="h1">: Đào tạo, bồi dưỡng, các quyền lợi và nghĩa vụ liên quan của người lao động</span></p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Đào tạo, bồi dưỡng: Người
                                lao động được đào tạo, bồi dưỡng, huấn luyện tại nơi làm việc hoặc được gửi đi đào tạo theo quy định của
                                Công ty và yêu cầu công việc.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Khen thưởng: Người lao động
                                được khuyến khích bằng vật chất và tinh thần khi có thành tích trong công tác hoặc theo quy định của
                                Công ty.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Các khoản thỏa thuận khác
                                gồm: tiền cơm trưa, thưởng mặc định, hỗ trợ xăng xe, điện thoại, nhà ở, trang phục…, theo quy định của
                                Công ty.</p>
                        </li>
                        <li data-list-text="-">
                            <p style={{ paddingTop: '6pt', paddingLeft: '12pt', textIndent: '-7pt', textAlign: 'left' }}>Nghĩa vụ liên quan của
                                người lao động:</p>
                        </li>
                    </ul>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Tuân thủ hợp đồng lao động.</p>
                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>+ Thực hiện công việc với sự tận
                        tâm, tận lực và mẫn cán, đảm bảo hoàn thành công việc với hiệu quả cao nhất theo sự phân công, điều hành (bằng
                        văn bản hoặc bằng miệng) của Ban Giám đốc (và các cá nhân được Ban Giám đốc bổ nhiệm hoặc ủy quyền phụ trách).
                    </p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>+ Hoàn thành công việc được giao
                        và sẵn sàng chấp nhận mọi sự điều động khi có yêu cầu.</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>+ Nắm rõ và chấp hành nghiêm túc
                        kỷ luật lao động, an toàn lao động, vệ sinh lao động, phòng cháy chữa cháy, văn hóa Công ty, nội quy lao động và
                        các chủ trương, chính sách của Công ty.</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>+ Trong trường hợp được cử đi
                        đào tạo thì nhân viên phải hoàn thành khoá học đúng thời hạn, phải cam kết sẽ phục vụ lâu dài cho Công ty sau
                        khi kết thúc khoá học và được</p>
                    <p style={{ paddingLeft: '5pt', textIndent: '0pt', lineHeight: '15pt', textAlign: 'justify' }}>hưởng nguyên lương, các quyền
                        lợi khác được hưởng như người đi làm.</p>
                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Nếu sau khi kết thúc khóa đào tạo
                        mà nhân viên không tiếp tục hợp tác với Công ty thì nhân viên phải hoàn trả lại 100% phí đào tạo và các khoản
                        chế độ đã được nhận trong thời gian đào tạo..</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Bồi thường vi phạm vật chất: Theo
                        quy định nội bộ cuả Công ty và quy định cuả pháp luật hiện hành;</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Có trách nhiệm đề xuất các giải
                        pháp nâng cao hiệu quả công việc, giảm thiểu các rủi ro. Khuyến khích các đóng góp này được thực hiện bằng văn
                        bản.</p>
                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>+ Thuế TNCN, nếu có: do người lao
                        động đóng. Công ty sẽ tạm khấu trừ trước khi chi trả cho người lao động theo quy định.</p>
                    <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều 5<span className="h1">:
                        Nghĩa vụ và quyền lợi của Người sử dụng lao động</span></p>
                    <ol id="l2">
                        <li data-list-text={1.}>
                            <p className="s3" style={{ paddingTop: '5pt', paddingLeft: '21pt', textIndent: '-16pt', textAlign: 'left' }}>Nghĩa vụ :
                            </p>
                            <ul id="l3">
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Thực hiện đầy đủ
                                        những điều kiện cần thiết đã cam kết trong HĐLĐ để Người lao động đạt hiệu quả công việc cao.
                                        Bảo đảm việc làm cho Người lao động theo HĐLĐ đã ký.</p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Thanh toán đầy đủ,
                                        đúng hạn các chế độ và quyền lợi cho người lao động theo hợp đồng lao động, thỏa ước lao động
                                        tập thể (nếu có);</p>
                                </li>
                            </ul>
                        </li>
                        <li data-list-text={2.}>
                            <p className="s3" style={{ paddingTop: '5pt', paddingLeft: '18pt', textIndent: '-13pt', textAlign: 'left' }}>Quyền lợi:
                            </p>
                            <ul id="l4">
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '2pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Điều hành Người
                                        lao động hoàn thành công việc theo HĐLĐ (bố trí, điều chuyển công việc cho Người lao động theo
                                        đúng chức năng chuyên môn).</p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Có quyền chuyển
                                        tạm thời lao động, ngừng việc, thay đổi, tạm hoãn, chấm dứt HĐLĐ và áp dụng các biện pháp kỷ
                                        luật theo quy định của Pháp luật hiện hành và theo nội quy của Công ty trong thời gian HĐLĐ còn
                                        giá trị.</p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Có quyền đòi bồi
                                        thường, khiếu nại với cơ quan liên đới để bảo vệ quyền lợi của mình nếu Người lao động vi phạm
                                        Pháp luật hay các điều khoản của HĐLĐ.</p>
                                    <p className="s2" style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Điều
                                        6:<span className="h1"> Những thỏa thuận khác</span></p>
                                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                        ………………………………………………........................................................................</p>
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                        ………………………………………………........................................................................</p>
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>
                                        ………………………………………………..</p>
                                    <p className="s2" style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'left' }}>Điều
                                        7<span className="h1">: Điều khoản thi hành</span></p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Những vấn đề về
                                        lao động không ghi trong hợp đồng lao động này thì áp dụng quy định cuả thỏa ước tập thể, trường
                                        hợp chưa có thỏa ước thì áp dụng quy định của pháp luật lao động.</p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '6pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Hợp đồng này
                                        được lập thành 2 bản có giá trị pháp lý như nhau, mỗi bên giữ 1 bản và có hiệu lực kể từ ngày
                                        ký.</p>
                                </li>
                                <li data-list-text="-">
                                    <p style={{ paddingTop: '5pt', paddingLeft: '5pt', textIndent: '0pt', textAlign: 'justify' }}>Khi ký kết các
                                        phụ lục hợp đồng lao động thì nội dung của phụ lục cũng có giá trị như các nội dung cuả bản hợp
                                        đồng này.</p>
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <p style={{ textIndent: '0pt', textAlign: 'left' }}><br /></p>
                    <h1 style={{ paddingTop: '10pt', paddingLeft: '57pt', textIndent: '0pt', textAlign: 'left' }}>NGƯỜI LAO ĐỘNG NGƯỜI SỬ DỤNG LAO
                        ĐỘNG</h1>
                    <p style={{ paddingTop: '6pt', paddingLeft: '0pt', textIndent: '0pt', textAlign: 'center' }}>(Ký, ghi rõ họ tên) (Ký, ghi rõ
                        họ tên)</p>
                </div>
            </div>
        </div>

    )
}

export default ContractWord