import Loading from '@/components/Loading';

const SuggestionLoading = () => {
  const title = 'Có thể bạn muốn nghe';
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <Loading />
    </div>
  );
};

export default SuggestionLoading;
