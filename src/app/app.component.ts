import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type Step = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly step = signal<Step>(0);
  readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  readonly spotifyUrl = 'https://open.spotify.com/intl-es/track/5wBBoVjoounI5e36oI8oZe?si=3f0ab90a936c4d0b';

  private readonly messages = [
    'Gracias por hacer mis días más bonitos. Esta flor es para recordarte lo especial que eres.',
    'Hay amistades que iluminan cualquier día. Qué suerte tener la tuya.',
    'Una flor amarilla para alguien que siempre sabe regalar sonrisas.',
    'Nuestra amistad hace que incluso los días comunes se sientan especiales.',
    'Aunque llegue un día tarde, esta flor viene con mucho cariño para ti.'
  ];

  readonly message = signal(this.pickMessage());

  next(): void {
    if (this.step() < 3) this.step.update((value) => (value + 1) as Step);
  }

  restart(): void {
    this.message.set(this.pickMessage(this.message()));
    this.step.set(0);
  }

  private pickMessage(previous?: string): string {
    const choices = this.messages.filter((message) => message !== previous);
    return choices[Math.floor(Math.random() * choices.length)];
  }
}
