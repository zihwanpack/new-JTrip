import { useFormContext } from 'react-hook-form';
import type { EventFormValues } from '../schemas/eventSchema.ts';

interface EventCreateCostStepProps {
  setStep: (step: number) => void;
}
export const EventCreateCostStep = ({ setStep }: EventCreateCostStepProps) => {
  const {
    watch,
    formState: { errors },
    register,
  } = useFormContext<EventFormValues>();

  const cost = watch('cost');
  const isStep3Valid = Boolean(cost);

  return <div>EventCreateCostStep</div>;
};
