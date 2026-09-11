import shutil
import os

src_dir = "/Users/mutegekicliffagaba/.gemini/antigravity/brain/58f36e72-7a12-456d-996c-0837d036c53c/"
dst_dir = "/Users/mutegekicliffagaba/Desktop/Websites & Apps/Young Wombs Trauma Center/assets/images/"

mapping = {
    "hero_young_wombs_1788112117837.jpg": "hero.jpg",
    "javi_hub_space_1788112136653.jpg": "javi_hub.jpg",
    "periods_dignity_edu_1788112164405.jpg": "periods.jpg",
    "community_advocacy_1788112193473.jpg": "community.jpg"
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")

print("Assets in destination:", os.listdir(dst_dir))
