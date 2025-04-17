import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Trang đăng nhập nếu chưa có auth
  },
});

export const config = {
  matcher: ["/my-list"], // Áp dụng middleware cho các route 
};
