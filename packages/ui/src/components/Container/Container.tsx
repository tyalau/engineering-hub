import { cn } from '@tyalau/ui/lib/utils'
import { containerVariants, type ContainerVariantProps } from './variants'

export type ContainerProps = React.ComponentProps<'div'> & ContainerVariantProps

export const Container = ({ className, size, ...props }: ContainerProps) => {
  return <div data-slot="container" className={cn(containerVariants({ size }), className)} {...props} />
}
