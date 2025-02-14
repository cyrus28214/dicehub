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
      success: res => resolve(res.data),
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  })
}

export async function updateUserName(name: string) {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/profile/name`,
      method: 'POST',
      data: {
        name: name
      },
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

export async function getComments(game_id): Promise<any[]> {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/comments?game_id=${game_id}`,
      method: 'GET',
      success: async res => resolve(res.data as any[]),
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  })
}

export async function uploadAvatar(avatarUrl: string) {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: apiUrl + '/profile/avatar',
      filePath: avatarUrl,
      name: 'file',
      success: res => resolve(res.data),
      fail: reject,
      header: {
        'Authorization': `Bearer ${token}`
      }
    })
  });
};

export async function submitComment(game_id, openid, rating, comment, date): Promise<any[]> {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${apiUrl}/comments`,
      method: 'POST',
      data: {
        game_id: game_id,
        content: comment,
        rating: rating,
        created_at: date,
        updated_at: date,
        user: {
          openid: openid,
          
        }
      }
    });
  });
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