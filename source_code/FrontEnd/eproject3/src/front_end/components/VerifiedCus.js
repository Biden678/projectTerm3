import axios from 'axios';
import { useEffect } from 'react';

import {useNavigate, useParams } from 'react-router-dom';


 function VerifiedCus(props) {
    const { cus_id } = useParams();
    const navigate = useNavigate();
    // Tiếp theo, bạn có thể sử dụng giá trị cusId trong yêu cầu Axios hoặc nơi cần thiết
    // Tiếp tục với axios.put
    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await axios.put(`http://localhost:5044/api/Users/VerifyCus${cus_id}`);
                if (response.status === 200) {
                    // Xác nhận thành công, thực hiện các thao tác khác nếu cần
                    navigate('/login')
                }
            } catch (error) {
                console.error('Error during account verification:', error);
            }
        };
        // Gọi hàm xác nhận khi component được mount
        verifyAccount();
    }, [cus_id]);
    return (
      <div>
        {/* <h1>Verified Account Page</h1> */}
        {/* Hiển thị nội dung của trang */}
      </div>
    ); 
}

export default VerifiedCus;