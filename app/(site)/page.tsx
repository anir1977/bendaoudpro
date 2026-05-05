import Link from 'next/link'
import { BijouCard } from '@/components/ProductCard'
import WhatsAppButton from '@/components/WhatsAppButton'
import HeroSlider from '@/components/HeroSlider'
import WatchesShowcase from '@/components/WatchesShowcase'
import { bijoux, categoryLabels } from '@/data/products'
import { Phone, MapPin, Clock, Award } from 'lucide-react'

export const revalidate = 3600

const featuredBijoux = bijoux.slice(0, 4)

const categories = [
  { key: 'collier', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/83363729_2896627917024017_5675658376671920128_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=0327a3&_nc_eui2=AeGSKK8hrwLTJ7a0i2OKNPFhjhxTvvZqUnyOHFO-9mpSfEL_SG01jMucZ2kpOkc-IWGx_HXXTfjF7C6nhxQ4Ub3M&_nc_ohc=ggrZV7cpvbIQ7kNvwEG5zAm&_nc_oc=AdqczcHYJRDuDHyWQ3n1SPDZaoHS4d-Mht3rCwa7p7K9HnBJPqRfiG5y5mO6Oy_ZYrs&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=QQxqELcpOSQIAUADZ532GQ&_nc_ss=7a3a8&oh=00_Af03VFelUawUvqB74EE1Jdo-LfChW0f0CJwC4k7KkSMqkw&oe=69FDCCDB' },
  { key: 'bague', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/31129408_1834556163231203_3323975344716775424_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGIoLDkEbBOR733AlT99FCicDaDSSiHI5RwNoNJKIcjlA6I2KMmFIL9Wi4xUmtu78z6o-K3EfKIrW-IlpTKqvuC&_nc_ohc=HXSeziHDisUQ7kNvwHD0vhJ&_nc_oc=Ado5oNJgvKkdgSTXsql79wBG4D0M22KxldBAytYUp3EMtSojlyFf_w8zlYFj6dUKPEc&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=wCigJDaVW9Lfzf8qRq8aSg&_nc_ss=7a3a8&oh=00_Af3Lz_hXdpEO5EzYvtC7xfUS2Byqma-0nOsKCZPNz5aLdQ&oe=69FDBCE5' },
  { key: 'bracelet', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/48356223_2158726057480877_4524250817972142080_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHHE5oiM3l2HmzNlYQmyKvx5fZtT-d2URbl9m1P53ZRFsUkzCZXq0UH44F-IFbZo-Er99ag8qmtsYUYGTIsU7XS&_nc_ohc=abBknFzS0jUQ7kNvwH4ia5c&_nc_oc=AdrTar3GALIrGOU7tfZOZSGDb5V20JudmkLxrX7AC81oP_dv2n75V9ApywtytVKtN_U&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=rgs1cL0O9RlnRmQ8deJ-5g&_nc_ss=7a3a8&oh=00_Af03bHC2a7vhK0c3-nQN_JwB9nMX5sPibx67MKFFevH--w&oe=69FDAF43' },
  { key: 'bague-mariage', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/103292818_3316352281718243_2399390175452965830_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=0327a3&_nc_eui2=AeHT1r_ALZJw7aCtpytukUu1KugkPvpJ4kkq6CQ--kniSWO9sye1GkjC0jXu4h7DPKbg245K5tufN7CfDdS7oE9z&_nc_ohc=_jwYr5vAxhsQ7kNvwG9j_7U&_nc_oc=AdoxRFxDI_S5RgR0EBxHLbwI4SfTcDbAXZuvqWKwrMyeMWMwU_joB9wbXx7bTz8lRxA&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=QgWBmTQwY5YhfG-9CVPBxg&_nc_ss=7a3a8&oh=00_Af3LrOngLGOkZmgut9cmiXFmOtrPf8iKMSD5I-2xuXhC4w&oe=69FD9945' },
  { key: 'gourmette', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/31166308_1834550596565093_5712246734915108864_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHWc8GB29sRHKUAX6lajy1lJytmhhtjz-MnK2aGG2PP4ymY8DaKVzObkEOdxCLyVeNEgYlggPxj6N2NmPc5jIGc&_nc_ohc=U0ic7E10dwEQ7kNvwH_uw5-&_nc_oc=AdpiGkCXG5ZYXzHXoJfeD-RLshPSZJKjJPeDrpj3hAOMUBHstlnRtKP8rbaj9W-Onm4&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=BpmsyD0eIKkQGCRwvIRcHg&_nc_ss=7a3a8&oh=00_Af2wCANNvqf_BQACiOzEZ2hBtKhnPyRk7YaRcQSsU_sFTw&oe=69FDB6CB' },
  { key: 'boucle-doreille', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/36255728_1906788226007996_2818404049836048384_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeF2UirNIfj51s8K9PWbjmvajvMXqlYGVi2O8xeqVgZWLQjVh0GWS3mIy9TWKJXja5TU70Mir3Mh92lP08DMXWY-&_nc_ohc=5pla0p0bqqAQ7kNvwGA2LmA&_nc_oc=Adqif5QKcgvIz89V9wiUZVttL6GlIMLUdINSvMjyMprLwDEMvlXRNswLR1B9O6ksi00&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=swIYpEv1fY8OmOIqTsiePg&_nc_ss=7a3a8&oh=00_Af1iptvxjmCeStuEehbG-gD_rBXhFqMlzNzqaM3FHa9C_A&oe=69FDBE6F' },
  { key: 'parure', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t39.30808-6/515349570_24355796287347203_2177128859739278006_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFZqBePwEWH7VOi4z5VXY9QgVntp9BeRPaBWe2n0F5E9mS22h_ZHdfDNGWvh6XscNoT3KQ3BMbXEe9Pj60Fe1g3&_nc_ohc=kFcL_kfLVeoQ7kNvwE02jcJ&_nc_oc=AdpAlTxYxkmgArG9s_RBFKOOBITwD_qNuV9cqMVvbhrED0w7Ibz-QffvV7_DYwJFY_o&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=PSawmaNJe5ch9Rlv_ZYxmg&_nc_ss=7a3a8&oh=00_Af3wjZTSYXSdBtkxI4VxZ2lxjqlTTRvz8EOvHiMpHqpijQ&oe=69DC27E8' },
  { key: 'sautoire', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/82982510_2898338640186278_3953634304977797120_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=0327a3&_nc_eui2=AeFt9s5HFvjZh_FJIYvUp1ApxsI0wIGZpczGwjTAgZmlzH-YczJpyIMRSGhUQKlGDMOw8ZDeNrMJ8PHZ4PEt5R4Q&_nc_ohc=d2s_rcjqZ1AQ7kNvwGCoxcB&_nc_oc=AdrcNc4_RX14qbRHjzkeH3PvLSUQorXPbujoK_NmatonrX3vWJ9p_skp-bNLxNX_mOc&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=syK8JPEcXVHQY1YWiHzhXA&_nc_ss=7a3a8&oh=00_Af0ogH_xiqrGJdftC01AWhmkpzny8Cnaxz3vxAUX8bCDVg&oe=69FDAA99' },
  { key: 'broche', image: 'https://scontent.fcmn7-1.fna.fbcdn.net/v/t1.6435-9/51564395_2233236840029798_7535518029182926848_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEfFTpvtNAlKBte_DXwwQJzFrHeE0_XO_oWsd4TT9c7-lVT0SI5gFIjNHqQ3hUmkHbuEq6FKIgCIBoFr0zIt3sb&_nc_ohc=le55bNIgs8YQ7kNvwEfMVjk&_nc_oc=AdqK9w6X9UtgatxglzSIVYmCPpKRdw3eRPqLwqgGc8L8CPqUVutgi5p-EWVksGS0FdM&_nc_zt=23&_nc_ht=scontent.fcmn7-1.fna&_nc_gid=KlK2UKxZ5FgB-EnXmMtstw&_nc_ss=7a3a8&oh=00_Af27ZY1XxwkWenzEO39q0ofNVN-TsDW61hdCP1yN6ig6lw&oe=69FD92C2' },
] as const

export default function HomePage() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />


      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos Catégories de Bijoux</h2>
            <div className="section-divider" />
            <p className="text-neutral-500 max-w-xl mx-auto text-sm">
              Une sélection raffinée de bijoux en or 18 carats pour chaque occasion.
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">
            {categories.map(({ key, image }) => (
              <Link
                key={key}
                href={`/bijoux/${key}`}
                className="flex flex-col items-center gap-3 p-3 border border-neutral-100 hover:border-gold-400 hover:shadow-md transition-all group text-center rounded-lg overflow-hidden"
              >
                <div className="w-full aspect-square rounded-md overflow-hidden bg-neutral-100">
                  <img
                    src={image}
                    alt={categoryLabels[key]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs tracking-wide text-neutral-600 group-hover:text-gold-600 leading-tight">
                  {categoryLabels[key]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bijoux */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Bijoux Sélectionnés</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {featuredBijoux.map((item) => (
              <BijouCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/bijoux" className="btn-outline-gold">
              Voir tous nos Bijoux
            </Link>
          </div>
        </div>
      </section>

      {/* Watches Showcase */}
      <WatchesShowcase />

      {/* About teaser */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 tracking-[0.3em] uppercase text-xs mb-4">Notre Histoire</p>
              <h2 className="font-serif text-4xl mb-6 leading-tight">
                Plus de 50 ans au service<br />de l'élégance marocaine
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                La Bijouterie Ben Daoud est une référence incontournable dans le monde de la bijouterie fine au Maroc. Fondée il y a plus de 50 ans, notre maison s'est forgée une réputation d'excellence et de savoir-faire reconnu dans tout le royaume.
              </p>
              <p className="text-neutral-300 leading-relaxed mb-8">
                Nous proposons une sélection de bijoux en or 18 carats et de montres de prestige, alliant traditions artisanales et tendances contemporaines.
              </p>
              <Link href="/a-propos" className="btn-gold">
                En Savoir Plus
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Award, title: 'Expertise', desc: 'Plus de 50 ans de savoir-faire dans la bijouterie fine' },
                { Icon: MapPin, title: 'Localisation', desc: 'Tachfine Center, au cœur de Casablanca' },
                { Icon: Phone, title: 'Service Client', desc: 'Une équipe à votre écoute pour vous conseiller' },
                { Icon: Clock, title: 'Horaires', desc: 'Ouvert 7j/7 pour vous accueillir' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="bg-neutral-800 p-5">
                  <Icon size={20} className="text-gold-400 mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gold-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl mb-3">Vous souhaitez connaître nos prix ?</h2>
          <p className="text-gold-100 mb-8 text-sm">
            Contactez-nous sur WhatsApp ou visitez notre boutique au Tachfine Center, Casablanca.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              variant="inline"
              label="Nous contacter sur WhatsApp"
              message="Bonjour, je souhaite avoir des informations sur vos produits et prix."
              className="text-sm"
            />
            <Link href="/contact" className="border border-white text-white px-6 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-white hover:text-gold-700 transition-colors">
              Voir nos coordonnées
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
