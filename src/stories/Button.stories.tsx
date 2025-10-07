import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Botón reutilizable con variantes de marca usando tokens del Design System'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Variante visual del botón'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón'
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del botón'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado deshabilitado'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Botón primario'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Botón secundario'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Botón fantasma'
  }
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Pequeño'
  }
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Grande'
  }
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Deshabilitado',
    disabled: true
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Fantasma</Button>
    </div>
  )
};
