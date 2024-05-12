<script lang="ts">
    import { cv } from "../store/cv";
    import { derived, get } from "svelte/store";
    import { removePhoto, uploadPhoto } from "../store/api";

    const photo = derived(cv, x => x.photo);

    async function onChange(e: Event) {
        const current = get(photo);
        if (current) {
            await removePhoto(current).catch();
        }
        const target = e.target as HTMLInputElement;
        const file = target.files![0];
        if (!file) {
            cv.update(x => {
                delete x.photo;
                return ({
                    ...x,
                });
            });
            return;
        }
        const url = await uploadPhoto(file);
        cv.update(x => ({...x, photo: url}));
    }
</script>
<label class="photo" class:empty={!$photo}>
    <img src={$photo} alt="Photo"/>
    <input type="file" on:change={onChange}>
</label>
<style lang="less">
  .photo {
    display: block;
    cursor: pointer;

    img {
      width: 100%;
      aspect-ratio: 1;
      border: solid var(--background) 2px;
      box-sizing: border-box;
    }

    &.empty {
      background: #213547;

      img {
        display: none;
      }
    }

    input {
      display: none;
    }
  }


</style>
