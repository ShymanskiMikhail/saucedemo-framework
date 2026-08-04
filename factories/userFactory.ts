export function createRandomUser() {
  const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return {
    username: `user_${uniqueId}`,
    email: `test_${uniqueId}@example.com`,
    password: 'SecurePassword123!',
  };
}
