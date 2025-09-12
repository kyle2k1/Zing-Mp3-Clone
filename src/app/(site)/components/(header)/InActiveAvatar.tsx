interface InActiveAvatarProps {
  setShowLoginModal: (value: boolean) => void;
}
const InActiveAvatar: React.FC<InActiveAvatarProps> = ({ setShowLoginModal }) => {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <div
        onClick={() => setShowLoginModal(true)}
        className="flex h-8 w-50 cursor-pointer items-center justify-center rounded-full bg-login text-xds font-bold text-white hover:opacity-90 sm:h-10 sm:w-64"
      >
        Đăng nhập
      </div>
    </div>
  );
};

export default InActiveAvatar;
