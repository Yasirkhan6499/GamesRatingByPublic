export const getRandomDarkColor = () => {
    
        const minBrightness = 30; // Minimum brightness value for a dark/medium color
        const maxBrightness = 220; // Maximum brightness value to avoid fully white color
      
        const randomChannelValue = () => Math.floor(Math.random() * 256); // Generate random channel value (0-255)
      
        let color;
        do {
          // Generate random RGB channel values
          const red = randomChannelValue();
          const green = randomChannelValue();
          const blue = randomChannelValue();
      
          // Calculate the brightness value of the color
          const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
      
          // Check if the color meets the criteria (dark/medium and not fully white)
          if (brightness >= minBrightness && brightness <= maxBrightness) {
            color = `rgb(${red}, ${green}, ${blue})`; // Construct the color string
          }
        } while (!color);
      
        return color;
    
      
  };