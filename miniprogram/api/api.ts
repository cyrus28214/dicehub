export const apiUrl = 'http://localhost:8080/api';
export function login() {
  wx.login({
    success: res => {
      console.log(res.code)
      wx.request({
        url: `${apiUrl}/login`,
        method: 'POST',
        data: {
          code: res.code
        },
        success: res => {
          console.log(res);
        }
      })
    },
  })
}