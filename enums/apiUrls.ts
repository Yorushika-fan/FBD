export enum Baidu {
  GetFileList = '/api/baidu/parse',
  GetDownloadLink = '/api/baidu/download',
  GetToken = '/api/baidu/token',
}

export enum Admin {
  GetUserList = '/api/admin/users',
  GetDashboard = '/api/admin/dashboard',
  UpdateSettings = '/api/admin/settings',
  GetLogs = '/api/admin/logs',
}

export enum Auth {
  Login = '/api/auth/login',
  Register = '/api/auth/register',
  Logout = '/api/auth/logout',
  RefreshToken = '/api/auth/refresh',
}

export enum User {
  GetProfile = '/api/user/profile',
  UpdateProfile = '/api/user/profile/update',
  ChangePassword = '/api/user/password/change',
}
