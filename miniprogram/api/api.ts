export const apiUrl = 'https://api.cyrus28214.top/api';
// export const apiUrl = 'http://localhost:8080/api'

let token: string | null = null;

export async function getToken() {
  if (token) return token;
  return new Promise((resolve, reject) => {
    wx.login({
      fail: reject,
      success: res => {
        wx.request({
          url: `${apiUrl}/login`,
          method: 'POST',
          data: {
            code: res.code
          },
          fail: reject,
          success: res2 => {
            const data = res2.data as Record<string, any>;
            token = data.token;
            resolve(token);
          }
        })
      },
    })
  })
}

export async function getProfile() {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/profile`,
      method: 'GET',
      success: resolve,
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  })
}

export async function getGames(): Promise<any[]> {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/games`,
      method: 'GET',
      success: async res => resolve(res.data as any[]),
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  })
}

export async function getTags(): Promise<any[]> {
  const token = getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/tags`,
      method: 'GET',
      success: async res => resolve(res.data as any[]),
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  })
}