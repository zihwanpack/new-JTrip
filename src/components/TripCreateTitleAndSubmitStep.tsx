import { useFormContext } from 'react-hook-form';
import type { TripFormValues } from '../schemas/tripSchema.ts';
import { createTripApi } from '../api/trip.ts';
import { useNavigate } from 'react-router-dom';
import { TRIP_CREATE_STEP_KEY } from '../constants/trip.ts';
import { useCreateAction } from '../hooks/useCreateAction.tsx';

interface TripCreateTitleAndSubmitStepProps {
  setStep: (step: number) => void;
}

export const TripCreateTitleAndSubmitStep = ({ setStep }: TripCreateTitleAndSubmitStepProps) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext<TripFormValues>();

  const navigate = useNavigate();
  const title = watch('title');
  const isStep4Valid = title && title.trim().length > 0;

  const {
    execute,
    isLoading: isCreateTripLoading,
    error: createTripError,
  } = useCreateAction(createTripApi);
  const handleCreateTrip = async () => {
    const formData = getValues();
    const { id } = await execute(formData);
    sessionStorage.removeItem(TRIP_CREATE_STEP_KEY);
    navigate(`/trips/${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 items-center mt-4 mx-4 min-h-[70px]">
        <h1 className="text-xl font-semibold">여행의 이름을 적어주세요</h1>
        <p className="text-sm text-primary-base">필수</p>
      </div>
      <div className="mx-4 mt-6 flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-primary-base focus-within:border-transparent transition-all bg-white">
        <input
          type="text"
          {...register('title')}
          placeholder="예) 서울 여행"
          className="w-full outline-none text-slate-700 placeholder:text-gray-300"
        />
      </div>
      <div className="mx-4 mt-1 min-h-[20px]">
        {errors.title && <p className="text-sm text-red-500 pl-1">{errors.title.message}</p>}
        {!errors.title && createTripError && (
          <p className="text-sm text-red-500 pl-1">{createTripError.message}</p>
        )}
      </div>
      <div className="flex-1" />
      <div className="flex gap-3 mb-4 px-4">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="w-full py-2 rounded-md font-semibold transition cursor-pointer bg-gray-100 text-slate-600 hover:bg-gray-200"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!isStep4Valid || isCreateTripLoading}
          onClick={() => {
            if (!isStep4Valid) return;
            handleCreateTrip();
          }}
          className={`
            w-full py-2 rounded-md font-semibold transition cursor-pointer
            ${
              isStep4Valid
                ? 'bg-primary-base text-white hover:opacity-90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isCreateTripLoading ? '여행 추가 중...' : '여행 추가'}
        </button>
      </div>
    </div>
  );
};
