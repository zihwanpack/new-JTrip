import kakaoLogo from '@/assets/login/logoKakao.svg';
import googleLogo from '@/assets/login/logoGoogle.svg';
import naverLogo from '@/assets/login/logoNaver.svg';

export const SocialLoginSection = () => {
  const providerList = [
    {
      image: kakaoLogo,
      provider: 'kakao',
      bgColor: 'bg-kakao',
    },
    {
      image: googleLogo,
      provider: 'google',
      bgColor: 'bg-google',
    },
    {
      image: naverLogo,
      provider: 'naver',
      bgColor: 'bg-naver',
    },
  ];

  return (
    <section className="flex gap-4">
      {providerList.map(({ image, provider, bgColor }) => {
        return (
          <button
            key={provider}
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
            }}
            className={`rounded-full p-3 shadow-md w-14 h-14 flex items-center justify-center cursor-pointer ${bgColor}`}
          >
            <img src={image} alt={`${provider} login`} className="w-6 h-6" />
          </button>
        );
      })}
    </section>
  );
};
