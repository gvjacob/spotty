import { Component, Prop, h } from "@stencil/core";
import { format } from "../../utils/utils";

@Component({
  tag: "spotty-playback",
  styleUrl: "styles.scss",
  shadow: true
})
export class SpottyPlayback {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div class="spotty-playback">
        <img
          class="album-image"
          src="https://images-na.ssl-images-amazon.com/images/I/81Rx58jObWL._SL1500_.jpg"
        />
        <div class="track-wrapper">
          <a
            class="spotty-suggest-link"
            href="https://www.google.com"
            target="_blank"
          >
            Suggest a tune
          </a>
          <h4 class="track-title">{"California Dreamin'"}</h4>
          <span>{"José Feliciano"}</span>
        </div>
      </div>
    );
  }
}
