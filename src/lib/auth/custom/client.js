class AuthClient {
  async signUp(params) {
    const { name, email, password } = params;

    try {
      const response = await fetch('http://localhost:4000/v1/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const data = await response.json();
      return data;
    } catch (errorData) {
      return errorData;
    }
  }

  async signInWithPassword(params) {
    const { email, password } = params;

    try {
      const response = await fetch('http://localhost:4000/v1/tokens/authentication', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return error;
      }

      const tokenData = await response.json();
      localStorage.setItem('auth-token', tokenData.authentication_token.token);
    } catch (error) {
      return error;
    }
  }

  async verifyEmail(token) {
    try {
      const response = await fetch('http://localhost:4000/v1/users/activated', {
        method: 'PUT',
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async resetPassword(_) {
    return {
      error: 'Password reset not implemented',
    };
  }

  async updatePassword(_) {
    return {
      error: 'Update reset not implemented',
    };
  }

  async getUser() {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      const response = await fetch(`http://localhost:4000/v1/users/${token}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      const userData = await response.json();
      return { data: userData };
    } catch (error) {
      return error;
    }
  }

  async signOut() {
    localStorage.removeItem('auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
