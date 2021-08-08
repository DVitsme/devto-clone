const AuthConditional = () => {
  const { username, user } = {};
  return (
    <div>
      <a
        href="#"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </a>
      <p className="mt-6 text-center text-base font-medium text-gray-500">
        Existing customer?{' '}
        <a href="#" className="text-indigo-600 hover:text-indigo-500">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default AuthConditional;
