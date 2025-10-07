import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Tarjeta reutilizable con variantes elevated y outline usando tokens del Design System'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'outline'],
      description: 'Variante visual de la tarjeta'
    },
    title: {
      control: { type: 'text' },
      description: 'Título de la tarjeta'
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtítulo de la tarjeta'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Tarjeta Elevada',
    subtitle: 'Con sombra y elevación',
    children: (
      <p>
        Esta es una tarjeta con variante elevated que usa tokens de sombra del Design System.
      </p>
    ),
    footer: (
      <Button variant="primary" size="sm">
        Acción
      </Button>
    )
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    title: 'Tarjeta Outline',
    subtitle: 'Con borde definido',
    children: (
      <p>
        Esta es una tarjeta con variante outline que usa tokens de borde del Design System.
      </p>
    ),
    footer: (
      <Button variant="secondary" size="sm">
        Acción
      </Button>
    )
  }
};

export const Simple: Story = {
  args: {
    variant: 'elevated',
    children: (
      <p>
        Tarjeta simple sin título ni footer, solo contenido.
      </p>
    )
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card 
        variant="elevated" 
        title="Elevated" 
        subtitle="Con sombra"
        style={{ width: '300px' }}
      >
        <p>Contenido de la tarjeta elevated</p>
      </Card>
      
      <Card 
        variant="outline" 
        title="Outline" 
        subtitle="Con borde"
        style={{ width: '300px' }}
      >
        <p>Contenido de la tarjeta outline</p>
      </Card>
    </div>
  )
};
